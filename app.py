from flask import Flask, request, jsonify, render_template
import numpy as np

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calcular", methods=["POST"])
def calcular():
    numeros = request.json["numeros"]
    arr = np.array(numeros)

    resultados = {
        "media": float(np.mean(arr)),
        "mediana": float(np.median(arr)),
        "variancia": float(np.var(arr)),
        "desvio_padrao": float(np.std(arr))
    }

    return jsonify(resultados)

if __name__ == "__main__":
    app.run(debug=True)
