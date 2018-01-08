from flask import Flask, render_template, request, json
app = Flask(__name__)

@app.route("/")
def main():
	return render_template('index.html')

@app.route("/details", methods=['POST', 'GET'])
def submitIndex():
    name = request.form['Name']
    global rollno
    rollno = request.form['RollNo']
    age = request.form['Age']
    sex = request.form['gender']
    data = [name, rollno, age, sex]
    fil = open("data.txt", mode="a")
    fil.write('\t'.join(data))
    fil.write('\n')
    fil.close()
    return render_template("index.html")
	
@app.route("/data", methods=['POST', 'GET'])
def submitData():
    data = request.form['json']
    f = open("log.txt", mode="a")
    f.write("\n")
    f.write(rollno)
    f.write(data)
    f.close()
    return render_template("task.html")

@app.route("/startTrial")
def showTask():
	return render_template("task.html")

@app.route("/endTrial")
def endTask():
	return render_template("finish.html")

@app.route("/return")
def showReturn():
    return render_template("index.html")

if __name__ =="__main__":
	app.run(host='0.0.0.0', debug=True, port=4000)
