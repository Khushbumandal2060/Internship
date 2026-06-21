import React, { useState } from "react";

function Calculator({ title }) {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const a = Number(num1);
  const b = Number(num2);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>Simple React Calculator</p>

        <input
          style={styles.input}
          type="number"
          placeholder="First Number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Second Number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />

        <div style={styles.grid}>
          <button
            style={styles.btn}
            onClick={() => setResult(a + b)}
          >
            Add
          </button>

          <button
            style={styles.btn}
            onClick={() => setResult(a - b)}
          >
            Subtract
          </button>

          <button
            style={styles.btn}
            onClick={() => setResult(a * b)}
          >
            Multiply
          </button>

          <button
            style={styles.btn}
            onClick={() =>
              setResult(b !== 0 ? a / b : "Cannot divide by zero")
            }
          >
            Divide
          </button>
        </div>

        <div style={styles.resultBox}>
          <span style={styles.resultLabel}>Result</span>
          <div style={styles.result}>
            {result !== null ? result : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0b1220, #1e293b)"
  },

  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    textAlign: "center"
  },

  title: {
    color: "#22d3ee",
    marginBottom: "5px"
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "#111827",
    color: "white",
    fontSize: "15px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "10px"
  },

  btn: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #22d3ee, #34d399)",
    color: "#0b1220",
    fontSize: "15px"
  },

  resultBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)"
  },

  resultLabel: {
    fontSize: "12px",
    color: "#94a3b8"
  },

  result: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#34d399",
    marginTop: "5px"
  }
};

export default Calculator;