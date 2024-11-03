from flask import Flask, request, jsonify
from flask_cors import CORS
from minimax import negotiate_price

app = Flask(__name__)
CORS(app)

@app.route('/negotiate', methods=['POST'])
def negotiate():
    data = request.get_json()
    item = data['item']
    user_price = data['price']
    
    ai_price = negotiate_price(user_price, 1000)
    
    message = f"The counter-offer is ${ai_price}. Do you accept?"
    return jsonify({'message': message})

if __name__ == '__main__':
    app.run(debug=True)