require 'webrick'
require 'net/http'
require 'uri'
require 'json'

PORT = 8085
STRIPE_SECRET_KEY = ENV['STRIPE_SECRET_KEY']

class PaymentIntentServlet < WEBrick::HTTPServlet::AbstractServlet
  def do_POST(request, response)
    response.status = 200
    response['Content-Type'] = 'application/json'
    response['Access-Control-Allow-Origin'] = '*'

    begin
      data = JSON.parse(request.body || '{}')
      amount = data['amount'] || 1595000
      customer_name = data['name'] || 'Cliente Encinas'
      description = data['description'] || 'Mesa Encinas Stone'
      metadata = data['metadata'] || {}

      uri = URI.parse('https://api.stripe.com/v1/payment_intents')
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true

      req = Net::HTTP::Post.new(uri.path)
      req.basic_auth(STRIPE_SECRET_KEY, '')

      form_data = {
        'amount' => amount.to_s,
        'currency' => 'mxn',
        'payment_method_types[]' => 'card',
        'description' => description,
        'metadata[cliente]' => customer_name
      }

      metadata.each do |key, val|
        form_data["metadata[#{key}]"] = val.to_s
      end

      req.set_form_data(form_data)

      res = http.request(req)
      response.body = res.body
    rescue => e
      response.status = 500
      response.body = { error: { message: e.message } }.to_json
    end
  end

  def do_OPTIONS(request, response)
    response.status = 200
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response['Access-Control-Allow-Headers'] = 'Content-Type'
  end
end

server = WEBrick::HTTPServer.new(
  Port: PORT,
  DocumentRoot: File.dirname(__FILE__)
)

server.mount('/create-payment-intent', PaymentIntentServlet)
server.mount('/api/create-payment-intent', PaymentIntentServlet)

trap('INT') { server.shutdown }
puts "Server running on http://localhost:#{PORT}"
server.start
