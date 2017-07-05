from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
	return render_template('index.html')

@app.route("/startTrial")
def showTask():
	return render_template("task.html")

if __name__ =="__main__":
	app.run(host='0.0.0.0', debug=True)

