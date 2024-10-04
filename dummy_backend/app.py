from datetime import datetime

from flask import Flask, Response, json, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def get_example_tasks():
    return {
        'pending': [
            {
                'id': 1,
                '_timestamp': 1,
                'text': 'Example task 1 +todotxt @ui due:2025-01-20',
                'createDate': '2024-01-01',
                'doneDate': None,
                'done': False
            },
            {
                'id': 2,
                '_timestamp': 2,
                'text': 'Example task 2 +todotxt @ui',
                'createDate': '2024-01-02',
                'doneDate': None,
                'done': False
            },
            {
                'id': 3,
                '_timestamp': 3,
                'text': 'Example task 3 +todotxt @ui',
                'createDate': '2024-01-03',
                'doneDate': None,
                'done': False
            },
        ],
        'done': [
            {
                'id': 4,
                '_timestamp': 4,
                'text': 'Example task 4 +todotxt @backend',
                'createDate': '2024-01-04',
                'doneDate': '2024-01-04',
                'done': True
            },
        ]
    }


@app.route('/api/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    response = Response()
    if email == 'user@foo.bar' and password == '123456789':
        response.set_cookie(
            key='sessionid',
            value='fake_session',
            max_age=30 * 60 * 60 * 24,
            path='/',
            httponly=True)
        response.set_cookie(
            key='authenticated',
            value='true',
            max_age=30 * 60 * 60 * 24,
            path='/')
    else:
        response.status_code = 401
    return response


@app.route('/api/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    response = Response()
    response.set_cookie(
        key='sessionid',
        value='',
        max_age=0,
        path='/',
        httponly=True)
    response.set_cookie(
        key='authenticated',
        value='false',
        max_age=0,
        path='/')
    return response


@app.route('/api/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register():
    data = request.get_json()
    email = data['email']
    _ = data['password']

    response = Response()
    if email == 'unverified@foo.bar':
        print('You can simulate success email verification by visiting:')
        print('http://localhost:5173/confirm-email?token=fake_token')
    else:
        response.status_code = 500
    return response


@app.route('/api/confirm_email', methods=['POST'])
@cross_origin(supports_credentials=True)
def confirm_email():
    data = request.get_json()
    email = data['email']
    _ = data['password']

    response = Response()
    if email != 'unverified@foo.bar':
        response.status_code = 500
    return response


@app.route('/api/change_password', methods=['POST'])
@cross_origin(supports_credentials=True)
def change_password():
    data = request.get_json()
    email = data.get('email', '')
    token = data.get('token', None)
    password = data.get('password', None)
    assert (
        (email and not (token and password))
        or (token and password and email))

    print(data)
    response = Response()
    if not token:
        if email != 'user@foo.bar':
            response.status_code = 500
        else:
            print('You can simulate change password success by visiting:')
            print('http://localhost:5173/change-password?email=user%40foo.bar&token=fake_token')  # noqa
    else:
        if email != 'user@foo.bar':
            response.status_code = 500
    return response


@app.route('/api/tasks', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_tasks():
    data = get_example_tasks()
    response = Response(json.dumps(data), mimetype='application/json')
    return response


@app.route('/api/import_file', methods=['POST'])
@cross_origin(supports_credentials=True)
def import_file():
    response = Response()
    return response


@app.route('/api/export_file', methods=['GET'])
@cross_origin(supports_credentials=True)
def export_file():
    filename = datetime.now().strftime('%Y%m%d') + '_todo.txt'
    filehref = 'data:text/plain;charset=utf-8,'
    data = {
            'filename': filename,
            'filehref': filehref,
            }
    response = Response(json.dumps(data), mimetype='application/json')
    return response


@app.route('/api/task', methods=['POST'])
@cross_origin(supports_credentials=True)
def operation_task():
    data = {
        '_timestamp': 1,
        'doneDate': '2024-01-01',
        }
    response = Response(json.dumps(data), mimetype='application/json')
    return response


if __name__ == '__main__':
    print()
    print('#################################################')
    print('Dummy backend is running on http://localhost:8000')
    print()
    print('Credentials for login and change password:')
    print('Email: user@foo.bar')
    print('Password: 123456789')
    print()
    print('Credentials email verification:')
    print('Email: unverified@foo.bar')
    print('#################################################')
    print()
    app.run(port=8000, debug=True)
