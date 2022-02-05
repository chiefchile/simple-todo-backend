pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                bat "npm install"
				bat "npm run build"
				bat "start npm start"
            }
        }
        stage("Test") {
            steps {
			    bat "npm test"
                bat "npm run it -- --disable-unicode --color off"
            }
        }
     }
}