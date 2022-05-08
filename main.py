from flask import Flask, request
from DB.pool_db import poolDB as db

app = Flask(__name__)


@app.route('/')
def hello_world():
    return "Hello world"


@app.route('/loan/request', methods=['POST'])
def request_loan():
    req_data = request.get_json()
    req_loan_amount = req_data["amount"]
    pool_users = req_data["pool_users"]
    pool_user_arr = pool_users.split(",")
    max_amount = 0  # total amount of the requested pool users
    for user in pool_user_arr:
        max_amount += db[int(user)]["amount"]

    max_loan = max_amount * (80 / 100)

    if req_data["amount"] <= max_loan:
        for user in pool_user_arr:
            personal_amount = db[int(user)]["amount"]
            minus_share = req_loan_amount * (personal_amount / max_amount)
            db[int(user)]["amount"] = personal_amount - minus_share

        return {
            "message": "Success !!!",
            "new_ledger_data": db
        }

    return "Bad loan !!!"


if __name__ == '__main__':
    app.run()
