from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/report', methods=['POST'])
def report():
    data = request.json
    location = data.get('location')
    description = data.get('description')
    
    # Simulate storing the data or other processing
    return jsonify({'message': f'Incident reported at {location}. Description: {description}'})

if __name__ == '__main__':
    app.run(debug=True)
