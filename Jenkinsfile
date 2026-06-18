pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/arathyac/Forecasthub.git'
            }
        }

        stage('Validate Files') {
            steps {
                sh '''
                test -f index.html
                test -f style.css
                test -f script.js
                echo "Required files found"
                '''
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r index.html style.css script.js /var/www/html/
                sudo systemctl restart nginx
                echo "ForecastHub deployed successfully"
                '''
            }
        }
    }
}
