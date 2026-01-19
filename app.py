from flask import Flask, request, jsonify, render_template
import numpy as np
from scipy import stats

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calcular", methods=["POST"])
def calcular():
    try:
        numeros = request.json.get("numeros", [])
        
        # Validar se a lista não está vazia
        if not numeros:
            return jsonify({"erro": "A lista de números não pode estar vazia"}), 400
        
        arr = np.array(numeros, dtype=float)
        
        resultados = {
            "media": float(np.mean(arr)),
            "mediana": float(np.median(arr)),
            "desvio_medio": float(np.mean(np.abs(arr - np.mean(arr)))),
            "desvio_padrao": float(np.std(arr)),
            "variancia": float(np.var(arr)),
        }

        return jsonify(resultados)
    
    except Exception as e:
        return jsonify({"erro": f"Erro ao processar dados: {str(e)}"}), 400

if __name__ == "__main__":
    app.run(debug=True)
