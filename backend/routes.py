from app import app, db
from flask import request, jsonify
from models import Friends

required_fields = ['name', 'role', 'description', 'gender']
# GET ALL FRIENDS
@app.route('/api/get_all_friends', methods=['GET'])
def get_friends():
  friends = Friends.query.all()
  result = [friends.to_json() for friends in friends]
  return jsonify({ "data": result }), 200

# CREATE ONE FRIEND
@app.route('/api/create_friend', methods=['POST'])
def create_friend():
  try:
    data = request.json

    for field in required_fields:
      if field not in data:
        return jsonify({'error': f'{field} is required'}), 400

    name = data.get('name')
    role = data.get('role')
    description = data.get('description')
    gender = data.get('gender')

    # Fetch avatar image based on gender
    if gender == 'male':
      img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif gender == 'female':
      img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
      img_url = None
    
    new_friend = Friends(name=name, role=role, description=description, gender=gender, img_url=img_url)
    db.session.add(new_friend)
    db.session.commit()

    return jsonify({"data": new_friend.to_json()}), 201
  except Exception as e:
    # Rollback changes in case of error
    db.session.rollback()
    return jsonify({'error': str(e)}), 400
  
# DELETE A FRIEND
@app.route('/api/delete_friend/<int:id>', methods=['DELETE'])
def delete_friend(id):
  try:
    friend = Friends.query.get(id)
    if friend is None:
      return jsonify({'error': 'Friend not found'}), 404
    db.session.delete(friend)
    db.session.commit()
    return jsonify({'message': 'Friend deleted successfully'}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({'error': str(e)}), 400
  

# UPDATE A FRIEND
@app.route('/api/update_friend/<int:id>', methods=['PUT'])
def update_friend(id):
  try:
    friend = Friends.query.get(id)
    if friend is None:
      return jsonify({'error': 'Friend not found'}), 404
    data = request.json

    friend.name = data.get('name', friend.name)
    friend.role = data.get('role', friend.role)
    friend.description = data.get('description', friend.description)

    db.session.commit()
    return jsonify({"data": friend.to_json()}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({'error': str(e)}), 400