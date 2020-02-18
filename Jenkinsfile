//可信任的私有仓库地址
   def REGISTRY_URL = "127.0.0.1:5000"
   def GIT_URL = "http://127.0.0.1"
   def PROJECT_IP="127.0.0.1"
   def APP_NAME = "itportal-mobille-web"
   def APP_DISPLAY_NAME = "itportal-mobille-web-atj"
   def PROJECT_URL="http://127.0.0.1:81/"
   def DOCKER_PRIVATE_U = "admin"
   def DOCKER_PRIVATE_P = "pcc@1234"
   def DOCKER_PRIVATE_ADDRESS = "127.0.0.1:5000"
   def APP_TAG="master"
   def NETWORK_NAME = "itportal"
   def EMAIL_TO = 'Honglin.Zhu@atj.volkswagen.com.cn,Kaidi.Qu@atj.volkswagen.com.cn,Zhichong.Hu@atj.volkswagen.com.cn'
   pipeline{
           agent any
           stages {
        stage('Build') {
            agent {
                docker {
                    image '127.0.0.1:5000/node-vuecli:latest'
                    args '-p 4000:4000'
                }
            }
            steps {
     //                           script{
    //  git branch: "master", credentialsId: '1', url: "http://127.0.0.1/pcc-check-list/cls-web.git"
     //     }

                // sh npm config set registry http://127.0.0.1:8085/nexus/content/groups/npm-public/
                sh '''npm config set registry http://127.0.0.1:8081/repository/npm-public/
                npm install
                npm run build'''
            }
        }
                stage('build docker images') {
            steps {
                ws("${env.WORKSPACE}@2") {
                    sh 'ls -l'
                    sh "docker build --build-arg DIST_PATH=${currentBuild.absoluteUrl} -t ${REGISTRY_URL}/${APP_NAME}:${APP_TAG} . "
                }

            }
        }
        stage('push docker images'){
            steps{
                script {
                    sh """docker login -u ${DOCKER_PRIVATE_U} -p ${DOCKER_PRIVATE_P} ${DOCKER_PRIVATE_ADDRESS}
                docker push ${REGISTRY_URL}/${APP_NAME}:${APP_TAG} """
                }
            }
        }
    //     stage('SonarQube analysis') {
    //         steps{
    //     def sonarqubeScannerHome = tool name: 'SonarQube Scanner'
    //     withSonarQubeEnv('SonarQube') {

    //         sh "chmod +x ${sonarqubeScannerHome}/bin/sonar-scanner"
    //         sh "${sonarqubeScannerHome}/bin/sonar-scanner"
    //         }

    // }

               stage('run docker images for prod') {
                   when{
                       branch 'master'
                   }
                   steps {
                       script {
                           try {
                               echo 'stop && remove old container'
                               sh """docker -H 127.0.0.1:2375 rm -f ${APP_DISPLAY_NAME}"""
                           } catch(Exception e) {
                               echo 'Handle the exception!'
                           }
                       }
                       sh """docker -H 127.0.0.1:2375 pull ${REGISTRY_URL}/${APP_NAME}:${APP_TAG}
                docker -H 127.0.0.1:2375 run -d --network=${NETWORK_NAME} -p 81:80 --name=${APP_DISPLAY_NAME} ${REGISTRY_URL}/${APP_NAME}:${APP_TAG}
                """

                   }
               }
    }
    post {
        success {
            mail bcc: '',
                        body: """<body leftmargin='8' marginwidth='0' topmargin='8' marginheight='4'
                        offset='0'>
                        <table width='95%' cellpadding='0' cellspacing='0'  style='font-size: 11pt; font-family: Tahoma, Arial, Helvetica, sans-serif'>
                        <tr>
                        本邮件由系统自动发出，请不要回复！<br/>
                        <td><font color='#2E8B57'>构建结果 - SUCCESS</font></td>
                        </tr>
                        <tr>
                        <td><br />
                        <b><font color='#0B610B'>构建信息</font></b>
                        <hr size='2' width='100%' align='center' /></td>
                        </tr>
                        <tr>
                        <td>
                        <ul>
                        <li>项目名称 ： ${APP_NAME}</li>
                        <li>构建编号 ： 第${currentBuild.number}次构建</li>
                        <li>构建时长： ${currentBuild.duration}</li>
                        <li>开始时间： ${currentBuild.startTimeInMillis}</li>
                        <li>工作空间 ： <a href='${currentBuild.absoluteUrl}'>${currentBuild.absoluteUrl}</a></li>
                        <li>此任务的链接地址 ： <a href='${JOB_URL}ws'>${JOB_URL}</a></li>
                        <li>项目链接：<a href='${PROJECT_URL}'>${PROJECT_URL}</a>
                        </ul>
                        </table></body> """,
                            from: 'VWATJ, CI PCC Notification <pcc@atj.volkswagen.com.cn>',
                            mimeType: 'text/HTML',
                            replyTo: '',
                            subject: "${APP_NAME}-第${BUILD_NUMBER}次构建日志",
                            to: "${EMAIL_TO}"
        }

        failure {
            mail bcc: '',
                                    body: """<body leftmargin='8' marginwidth='0' topmargin='8' marginheight='4'
                                    offset='0'>
                                    <table width='95%' cellpadding='0' cellspacing='0'  style='font-size: 11pt; font-family: Tahoma, Arial, Helvetica, sans-serif'>
                                    <tr>
                                    本邮件由系统自动发出，请不要回复！<br/>
                                    <td><font color='#CC0000'>构建结果 - FAILED</font></td>
                                    </tr>
                                    <tr>
                                    <td><br />
                                    <b><font color='#0B610B'>构建信息</font></b>
                                    <hr size='2' width='100%' align='center' /></td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <ul>
                                    <li>项目名称 ： ${APP_NAME}</li>
                                    <li>构建编号 ： 第${currentBuild.number}次构建</li>
                                    <li>构建时长： ${currentBuild.duration}</li>
                                    <li>开始时间： ${currentBuild.startTimeInMillis}</li>
                                    <li>工作空间 ： <a href='${currentBuild.absoluteUrl}'>${currentBuild.absoluteUrl}</a></li>
                                    <li>此任务的链接地址 ： <a href='${JOB_URL}ws'>${JOB_URL}</a></li>
                                    </ul>
                                    </table></body> """,
                                        from: 'VWATJ, CI PCC Notification <pcc@atj.volkswagen.com.cn>',
                                        mimeType: 'text/HTML',
                                        replyTo: '',
                                        subject: "${APP_NAME}-第${BUILD_NUMBER}次构建日志",
                                        to: "${EMAIL_TO}"
        }
    }


   }

