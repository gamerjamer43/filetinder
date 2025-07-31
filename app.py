from flask import Flask, render_template, jsonify, request
from file import File
from json import load

app = Flask(__name__)

# sample data for profiles, gonna eventually use mongo but for rn we'll just do in memory
with open('data/info.json', 'r') as f:
    profiles = [File(id=profile['id'], name=profile['name'], description=profile['description'], image=profile['image']) for profile in load(f)['profiles']]

# normal index route or i can't show shit
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# basic route to get profiles via jsonification
@app.route('/profiles', methods=['GET'])
def get_profiles():
    return jsonify(profiles)

@app.route('/swipe', methods=['POST'])
def swipe():
    # get profile ID and action from the request
    data = request.json
    pid = data.get('id')
    action = data.get('action')  # options are check or dislike will change names eventually

    # placeholder print instead of logging to mongo
    print(f"{action} was placed on {pid}")

    # return an ok
    return jsonify(status='ok')

# run the app
if __name__ == '__main__':
    app.run(debug=True)