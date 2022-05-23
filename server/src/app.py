from flask import Blueprint, Flask, request, jsonify, g
from flask_cors import CORS, cross_origin
from v1.dog.router import DogRouter
from v1.cat.router import CatRouter
from v1.user.router import UserRouter
from v1.auth import login as auth_login, verify_token as auth_verify_token

# blueprint = Blueprint('blueprint', __name__)

# @blueprint.after_request 
# def after_request(response):
#     header = response.headers
#     header['Access-Control-Allow-Origin'] = '*'
#     header['Access-Control-Allow-Headers']='Content-Type'
#     # Other headers can be added here if needed
#     return response

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'I/L0ve/CIT-U'

app.register_blueprint(DogRouter.handler())
app.register_blueprint(CatRouter.handler())
app.register_blueprint(UserRouter.handler())

@app.route("/")
def helloWorld():
  return "Hello, cross-origin!"

@app.route('/v1/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.json
    if 'username' in data and 'password' in data:
        token = auth_login(data['username'], data['password'])
        if token is not False:
            return jsonify({'token': token})
    return jsonify({'message': 'Invalid username or password'}), 403
    

@app.route('/v1/verify-token')
def verify_token():
    token = request.args.get('token')
    if not auth_verify_token(token):
        return jsonify({'message': 'Invalid token'}), 403
    return jsonify({'ok': 'Token is valid'})

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=8000)