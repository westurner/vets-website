def envNames = ['development', 'staging', 'production']
def envs = [:]

// Define build environments for each build type.
// Some useful branch-api-plugin env docs: https://github.com/jglick/branch-api-plugin/blob/fe9b02af870105954f978b52faab2669c787dc9f/src/main/resources/jenkins/branch/BranchNameContributor/buildEnv.properties


envNames.each { envName ->
  envs[envName] = [
    "NODE_ENV=production",
    "BUILDTYPE=${envName}"
  ]
}

def isPushNotificationOnFeature = {
  !env.CHANGE_TARGET && !['master', 'production'].contains(env.BRANCH_NAME)
}

def isContentTeamUpdate = {
  env.BRANCH_NAME ==~ /^content\/wip\/.*/
}

def isProtectedMergePreviouslyTested = {
  (env.BRANCH_NAME == 'master' ||
    env.BRANCH_NAME == 'production')
}

def buildDetails = { vars ->
  """
    BUILDTYPE=${vars['buildtype']}
    NODE_ENV=production
    BRANCH_NAME=${env.BRANCH_NAME}
    CHANGE_TARGET=${env.CHANGE_TARGET}
    BUILD_ID=${env.BUILD_ID}
    BUILD_NUMBER=${env.BUILD_NUMBER}
  """.stripIndent()
}

def dockerCommandWithEnv = { command, env ->
  def envc = ""
  env.each { var ->  envc += "-e '${var}'" }
  "docker run --rm -t -v `pwd`/build:/application/build ${envc} vets-website:build-${env.BUILD_NUMBER} ${command}"
}

pipeline {
  agent label: 'vets-website-linting'

  post {
    always {
      archive "build/**/*"
    }
  }

  stages {
    stage('Prepare') {
      when {
        !isPushNotificationOnFeature()
      }

      steps {
        checkout scm
        sh 'mkdir -p build'
      }     
    }

    stage('Docker Image') {
      when {
        !isPushNotificationOnFeature() && !isContentTeamUpdate()
      }

      steps {
        sh "docker build . -t vets-website:build-${env.BUILD_NUMBER}"
      }
    }

    stage('Security') {
      when {
        !isPushNotificationOnFeature() && !isContentTeamUpdate()
      }

      steps {
        sh dockerCommandWithEnv("check", [:])
      }
    }

    stage('Lint') {
      when {
        !isPushNotificationOnFeature() && !isContentTeamUpdate()
      }

      steps {
        sh dockerCommandWithEnv("lint", [:])
      }
    }

    stage('Build') {
      when {
        !isPushNotificationOnFeature() && !isContentTeamUpdate()
      }

      steps {
        parallel(
          'development': {
            sh "rm -rf build/development"
            sh dockerCommandWithEnv("build", envs['development'])
            sh "echo \"${buildDetails('buildtype': 'development')}\" > build/development/BUILD.txt" 
          },

          'staging': {
            sh "rm -rf build/staging"
            sh dockerCommandWithEnv("build", envs['staging'])
            sh "echo \"${buildDetails('buildtype': 'staging')}\" > build/staging/BUILD.txt" 
          },

          'production': {
            sh "rm -rf build/production"
            sh dockerCommandWithEnv("build", envs['production'])
            sh "echo \"${buildDetails('buildtype': 'production')}\" > build/production/BUILD.txt" 
          }
        )
      }
    }

    stage('Unit') {
      when {
        !isPushNotificationOnFeature() && !isContentTeamUpdate() && !isProtectedMergePreviouslyTested()
      }

      steps {
        parallel(
          'development': {
            sh dockerCommandWithEnv("test:unit", envs['development'])
          },

          'staging': {
            sh dockerCommandWithEnv("test:unit", envs['staging'])
          },

          'production': {
            sh dockerCommandWithEnv("test:unit", envs['production'])
          }
        ) 
      }
    }

    stage('E2E') {
      when {
        !isPushNotificationOnFeature() && !isContentTeamUpdate() && !isProtectedMergePreviouslyTested()
      }

      steps {
        parallel(
          'development': {
            sh dockerCommandWithEnv("test:e2e", envs['development'])
          },

          'staging': {
            sh dockerCommandWithEnv("test:e2e", envs['staging'])
          },

          'production': {
            sh dockerCommandWithEnv("test:e2e", envs['production'])
          }
        )
      }
    }

    stage('Accessibility') {
      when {
        !isPushNotificationOnFeature() && !isContentTeamUpdate() && !isProtectedMergePreviouslyTested()
      }

      steps {
        sh dockerCommandWithEnv("test:accessibility", envs['development'])
      }
    }
  }
}
