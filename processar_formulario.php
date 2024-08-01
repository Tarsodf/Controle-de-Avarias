from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',  # Coloque sua senha aqui, se houver.
        database='sistema_avarias'
    )
    return conn

@app.route('/avarias', methods=['GET'])
def get_avarias():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM avarias')
    avarias = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(avarias)

@app.route('/avarias', methods=['POST'])
def add_avaria():
    data = request.json
    descricao = data.get('descricao')
    data_registro = data.get('data_registro')
    id_usuario = data.get('id_usuario')
    tipo_avaria = data.get('tipo_avaria')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO avarias (descricao, data_registro, id_usuario, tipo_avaria) VALUES (%s, %s, %s, %s)',
        (descricao, data_registro, id_usuario, tipo_avaria)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Avaria adicionada com sucesso"}), 201

@app.route('/avarias/<int:id>', methods=['PUT'])
def update_avaria(id):
    data = request.json
    descricao = data.get('descricao')
    data_registro = data.get('data_registro')
    id_usuario = data.get('id_usuario')
    tipo_avaria = data.get('tipo_avaria')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE avarias SET descricao = %s, data_registro = %s, id_usuario = %s, tipo_avaria = %s WHERE id = %s',
        (descricao, data_registro, id_usuario, tipo_avaria, id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Avaria atualizada com sucesso"})

@app.route('/avarias/<int:id>', methods=['DELETE'])
def delete_avaria(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM avarias WHERE id = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Avaria removida com sucesso"})

@app.route('/testdb', methods=['GET'])
def test_db_connection():
    try:
        conn = get_db_connection()
        conn.close()
        return jsonify({"message": "Conexão com o banco de dados bem-sucedida!"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
