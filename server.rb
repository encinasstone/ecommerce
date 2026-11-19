# Servidor LOCAL de pruebas (producción usa api/create-payment-intent.js en Vercel).
# El precio se calcula aquí con la tabla oficial; el navegador solo envía la configuración.
require 'webrick'
require 'net/http'
require 'uri'
require 'json'

PORT = 8085
STRIPE_SECRET_KEY = ENV['STRIPE_SECRET_KEY']

# Debe coincidir con PRICING_MATRIX de app.js y de api/create-payment-intent.js
PRICING_MATRIX = {
  4 => { base: 15950, dim: '130 x 90 cm',
         cubiertas: { 'MEL BLANCA' => 0, 'MEL NEGRA' => 0, 'DALLAS' => 2850, 'DIAMOND' => 3400, 'SGABRIEL' => 3400, 'CTT LIGHT' => 4350 },
         bases: { 'POLAR' => 0, 'ROSA' => 0, 'MOCZAN' => 0, 'PAROTA' => 3700 },
         diseno: { 'LISO' => 0, 'LAMBRIN' => 2600 } },
  6 => { base: 19800, dim: '160 x 100 cm',
         cubiertas: { 'MEL BLANCA' => 0, 'MEL NEGRA' => 0, 'DALLAS' => 4100, 'DIAMOND' => 5000, 'SGABRIEL' => 5000, 'CTT LIGHT' => 6900 },
         bases: { 'POLAR' => 0, 'ROSA' => 0, 'MOCZAN' => 0, 'PAROTA' => 3000 },
         diseno: { 'LISO' => 0, 'LAMBRIN' => 3800 } },
  8 => { base: 24100, dim: '230 x 125 cm',
         cubiertas: { 'MEL BLANCA' => 0, 'MEL NEGRA' => 0, 'DALLAS' => 8800, 'DIAMOND' => 10600, 'SGABRIEL' => 10600, 'CTT LIGHT' => 14400 },
         bases: { 'POLAR' => 0, 'ROSA' => 0, 'MOCZAN' => 0, 'PAROTA' => 4600 },
         diseno: { 'LISO' => 0, 'LAMBRIN' => 4600 } }
}.freeze

class PaymentIntentServlet < WEBrick::HTTPServlet::AbstractServlet
  def json(response, status, obj)
    response.status = status
    response['Content-Type'] = 'application/json'
    response.body = obj.to_json
  end

  def do_POST(request, response)
    data = JSON.parse(request.body || '{}')
    s = ->(k, max = 200) { data[k].is_a?(String) ? data[k].strip[0, max] : '' }

    m = PRICING_MATRIX[data['capacity'].to_i]
    stone, base, diseno = s.('stoneCode', 30), s.('baseCode', 30), s.('disenoCode', 30)
    unless m && m[:cubiertas].key?(stone) && m[:bases].key?(base) && m[:diseno].key?(diseno)
      return json(response, 400, error: { message: 'Configuración de mesa no válida.' })
    end

    name, phone, city, address = s.('name', 100), s.('phone', 30), s.('city', 60), s.('address')
    if [name, phone, city, address].any?(&:empty?)
      return json(response, 400, error: { message: 'Faltan datos de contacto o de entrega.' })
    end

    total = m[:base] + m[:cubiertas][stone] + m[:bases][base] + m[:diseno][diseno]
    modelo = "Mesa #{data['capacity'].to_i} Personas (#{m[:dim]})"

    uri = URI.parse('https://api.stripe.com/v1/payment_intents')
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Post.new(uri.path)
    req.basic_auth(STRIPE_SECRET_KEY, '')
    req.set_form_data(
      'amount' => (total * 100).to_s,
      'currency' => 'mxn',
      'payment_method_types[]' => 'card',
      'description' => "Orden Encinas Stone: #{modelo} (#{name})",
      'metadata[cliente]' => name, 'metadata[telefono]' => phone,
      'metadata[ciudad]' => city, 'metadata[direccion]' => address,
      'metadata[modelo]' => modelo, 'metadata[base]' => base,
      'metadata[diseno]' => diseno, 'metadata[cubierta]' => stone,
      'metadata[total_mxn]' => total.to_s
    )
    res = JSON.parse(http.request(req).body)
    return json(response, 502, error: { message: 'No se pudo iniciar el pago con Stripe.' }) unless res['client_secret']

    json(response, 200, client_secret: res['client_secret'], amount: total)
  rescue => e
    json(response, 500, error: { message: e.message })
  end
end

server = WEBrick::HTTPServer.new(Port: PORT, DocumentRoot: File.dirname(__FILE__))
server.mount('/api/create-payment-intent', PaymentIntentServlet)
trap('INT') { server.shutdown }
puts "Server running on http://localhost:#{PORT}"
server.start
