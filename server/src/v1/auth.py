from flask import jsonify, request, current_app
import jwt
import datetime
from db import Db

def jwt_token_required():
    token = request.args.get('token')
    if not token:
        return jsonify({'message': 'Token is required'}), 403
    if not verify_token(token):
        return jsonify({'message': 'Token is invalid or expired'}), 403

def admin_required():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'message': 'User Id is required'}), 403
    if not verify_user(user_id):
        return jsonify({'message': 'Unauthorized'}), 401

def verify_user(user_id):
    db = Db.get_instance()
    sql = "SELECT * FROM users WHERE id = '" + user_id + "'"

    try:
        user = db.fetchone(sql)
        return user['type'] == 'ADMIN'
    except:
        return False

def verify_token(token):
    try:
        decoded_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms='HS256')
    except:
        return False
    return decoded_token

def login(username, password):
    db = Db.get_instance()
    sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
    user = db.fetchone(sql)
    if user:
        payload = {
            'username': username,
            'id': 100,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        return token, user
    return False
