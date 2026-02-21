from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Murali26",
    database="master_data_db"
)


@app.route("/")
def home():
    return "Backend is running!"



@app.route("/units", methods=["GET"])
def get_units():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM units")
    result = cursor.fetchall()
    cursor.close()
    return jsonify(result)


@app.route("/units", methods=["POST"])
def add_unit():
    data = request.json

    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO units (name, symbol, description) VALUES (%s, %s, %s)",
        (data.get("name"), data.get("symbol"), data.get("description"))
    )
    db.commit()
    cursor.close()

    return jsonify({"message": "Unit added successfully!"})


@app.route("/units/<int:id>", methods=["PUT"])
def update_unit(id):
    data = request.json

    cursor = db.cursor()
    cursor.execute(
        "UPDATE units SET name=%s, symbol=%s, description=%s WHERE id=%s",
        (data.get("name"), data.get("symbol"), data.get("description"), id)
    )
    db.commit()
    cursor.close()

    return jsonify({"message": "Unit updated successfully!"})


@app.route("/units/<int:id>", methods=["DELETE"])
def delete_unit(id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM units WHERE id=%s", (id,))
    db.commit()
    cursor.close()

    return jsonify({"message": "Unit deleted successfully!"})



@app.route("/shifts", methods=["GET"])
def get_shifts():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM shifts")
    result = cursor.fetchall()
    cursor.close()

    # 🔥 FIX: Convert TIME fields to string
    for row in result:
        if row["start_time"]:
            row["start_time"] = str(row["start_time"])
        if row["end_time"]:
            row["end_time"] = str(row["end_time"])

    return jsonify(result)


@app.route("/shifts", methods=["POST"])
def add_shift():
    data = request.json

    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO shifts (name, start_time, end_time, color) VALUES (%s, %s, %s, %s)",
        (
            data.get("name"),
            data.get("start_time"),
            data.get("end_time"),
            data.get("color")
        )
    )
    db.commit()
    cursor.close()

    return jsonify({"message": "Shift added successfully!"})


@app.route("/shifts/<int:id>", methods=["PUT"])
def update_shift(id):
    data = request.json

    cursor = db.cursor()
    cursor.execute(
        "UPDATE shifts SET name=%s, start_time=%s, end_time=%s, color=%s WHERE id=%s",
        (
            data.get("name"),
            data.get("start_time"),
            data.get("end_time"),
            data.get("color"),
            id
        )
    )
    db.commit()
    cursor.close()

    return jsonify({"message": "Shift updated successfully!"})


@app.route("/shifts/<int:id>", methods=["DELETE"])
def delete_shift(id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM shifts WHERE id=%s", (id,))
    db.commit()
    cursor.close()

    return jsonify({"message": "Shift deleted successfully!"})


if __name__ == "__main__":
    app.run(debug=True)