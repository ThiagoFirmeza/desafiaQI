# app.py
from flask import Flask, request, jsonify
import mercadopago
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite que o front-end chame o backend

# Inicializar SDK do Mercado Pago
sdk = mercadopago.SDK("SEU_ACCESS_TOKEN")  # Substitua pelo seu Access Token Mercado Pago

# Simulação de armazenamento de pagamentos
payments = {}

@app.route("/create-pix", methods=["POST"])
def create_pix():
    data = request.json
    user_id = data.get("userId", "anon")  # Identificador do usuário

    # Criar pagamento Pix
    preference_data = {
        "items": [
            {
                "title": "Desbloqueio do resultado DesafiaQI",
                "quantity": 1,
                "unit_price": 4.90
            }
        ],
        "payment_methods": {
            "excluded_payment_types": [{"id": "credit_card"}, {"id": "debit_card"}],
            "excluded_payment_methods": [],
            "installments": 1
        },
        "payer": {
            "email": f"{user_id}@example.com"
        },
        "external_reference": user_id
    }

    preference_response = sdk.preference().create(preference_data)
    init_point = preference_response["response"]["init_point"]

    # Guardar status do pagamento
    payments[user_id] = {"paid": False, "init_point": init_point}

    return jsonify({"url": init_point})

@app.route("/check-payment/<user_id>", methods=["GET"])
def check_payment(user_id):
    status = payments.get(user_id, {"paid": False})
    return jsonify({"paid": status["paid"]})

@app.route("/webhook", methods=["POST"])
def webhook():
    body = request.json
    # Recebe notificações do Mercado Pago
    if body.get("type") == "payment":
        payment_id = body["data"]["id"]
        payment_info = sdk.payment().get(payment_id)
        payer_email = payment_info["response"]["payer"]["email"]
        user_id = payer_email.split("@")[0]

        if payment_info["response"]["status"] == "approved":
            payments[user_id]["paid"] = True
    return jsonify({"status": "ok"}), 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)
