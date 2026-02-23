from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)


def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Murali26",
        database="master_data_db",
        autocommit=True
    )


@app.route("/")
def home():
    return jsonify({"message": "Backend running"}), 200




@app.route("/units", methods=["GET"])
def get_units():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM units")
        result = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(result), 200
    except Exception as e:
        return jsonify([]), 500


@app.route("/units", methods=["POST"])
def add_unit():
    try:
        data = request.json
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO units (name, symbol, description) VALUES (%s, %s, %s)",
            (data["name"], data["symbol"], data["description"])
        )
        cursor.close()
        db.close()
        return jsonify({"message": "Unit added"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/units/<int:id>", methods=["PUT"])
def update_unit(id):
    try:
        data = request.json
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE units SET name=%s, symbol=%s, description=%s WHERE id=%s",
            (data["name"], data["symbol"], data["description"], id)
        )
        cursor.close()
        db.close()
        return jsonify({"message": "Unit updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/units/<int:id>", methods=["DELETE"])
def delete_unit(id):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM units WHERE id=%s", (id,))
        cursor.close()
        db.close()
        return jsonify({"message": "Unit deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/shifts", methods=["GET"])
def get_shifts():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM shifts")
        result = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(result), 200
    except Exception:
        return jsonify([]), 500


@app.route("/shifts", methods=["POST"])
def add_shift():
    try:
        data = request.json
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO shifts (name, start_time, end_time, color) VALUES (%s, %s, %s, %s)",
            (data["name"], data["start_time"], data["end_time"], data["color"])
        )
        cursor.close()
        db.close()
        return jsonify({"message": "Shift added"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/shifts/<int:id>", methods=["PUT"])
def update_shift(id):
    try:
        data = request.json
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE shifts SET name=%s, start_time=%s, end_time=%s, color=%s WHERE id=%s",
            (data["name"], data["start_time"], data["end_time"], data["color"], id)
        )
        cursor.close()
        db.close()
        return jsonify({"message": "Shift updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/shifts/<int:id>", methods=["DELETE"])
def delete_shift(id):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM shifts WHERE id=%s", (id,))
        cursor.close()
        db.close()
        return jsonify({"message": "Shift deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)