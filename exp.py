from flask import Flask, render_template, request, json
app = Flask(__name__)

@app.route("/")
def main():
	return render_template('index.html')

@app.route("/submit", methods=['POST', 'GET'])
def submitDetails():
	name = request.form['inputName']
	email = request.form['inputEmail']
	age = request.form['inputAge']
	sex = request.form['gender']
	data = [name, email, age, sex]
	fil = open("data.txt", mode="a")
	fil.write('\t'.join(data))
	fil.write('\n')
	fil.close()
	return render_template("index.html")
	
@app.route("/startTrial")
def showTask():
	return render_template("task.html")

@app.route("/finish")
def showFinish():
	return render_template("finish.html")

@app.route("/return")
def showReturn():
	return render_template("index.html")

@app.route("/logData", methods=["POST","GET"])
def logData():
	data = request.form['json']
	with open("data_log.txt", mode="a") as f:
		f.write("\n")
		f.write(data)
	return render_template("task.html")

if __name__ =="__main__":
	app.run(host='0.0.0.0', debug=True, port=3000)
