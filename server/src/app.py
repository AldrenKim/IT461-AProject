import os
import json
from flask import Blueprint, Flask, request, jsonify, g, send_file, abort
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from v1.animal.router import AnimalRouter
from v1.plant.router import PlantRouter
from v1.user.router import UserRouter
from v1.auth import login as auth_login, verify_token as auth_verify_token

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'I/L0ve/CIT-U'
app.config['UPLOAD_FOLDER'] = 'objects'
app.config['MAX_CONTENT_PATH'] = 20 * 1024 * 1024
app.config['UPLOAD_EXTENSIONS'] = ['.obj']

app.register_blueprint(AnimalRouter.handler())
app.register_blueprint(PlantRouter.handler())
app.register_blueprint(UserRouter.handler())

@app.route('/v1/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.json
    if 'username' in data and 'password' in data:
        token, user = auth_login(data['username'], data['password'])
        if token is not False:
            return jsonify({'token': token, 'user': user})
    return jsonify({'message': 'Invalid username or password'}), 403

@app.route('/v1/verify-token')
def verify_token():
    token = request.args.get('token')
    if not auth_verify_token(token):
        return jsonify({'message': 'Invalid token'}), 403
    return jsonify({'ok': 'Token is valid'})

@app.route('/v1/files', methods = ['POST'])
def upload_file():
    token = request.args.get('token')
    if not auth_verify_token(token):
        return jsonify({'message': 'Invalid token'}), 403

    filename = request.form.get('filename', '')
    file = request.files.get('file', None)
    filename = secure_filename(filename)
    file_ext = os.path.splitext(filename)[1]
    if file_ext not in app.config['UPLOAD_EXTENSIONS']:
        return jsonify({'error': 'File not supported'}), 400
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return jsonify({'ok': 'File uploaded'})

@app.route('/v1/files/<filename>', methods = ['GET'])
def get_file(filename):
    token = request.args.get('token')
    if not auth_verify_token(token):
        return jsonify({'message': 'Invalid token'}), 403

    return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename), as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=8080)
