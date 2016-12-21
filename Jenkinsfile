def envNames = ['development', 'staging', 'production']
def envs = [:]

env.BRANCH_NAME = 'jk-build-improvements'
env.NODE_ENV = 'production'

// Define build environments for each build type.
// Some useful branch-api-plugin env docs: https://github.com/jglick/branch-api-plugin/blob/fe9b02af870105954f978b52faab2669c787dc9f/src/main/resources/jenkins/branch/BranchNameContributor/buildEnv.properties

for (int i=0; i < envNames.size(); i++) {
  def envName = envNames.get(i)

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
  env.each { var ->  envc += "'${var}' " }

  docker.image(dockerImage).inside {
    sh "${envc}${command}"
  }
}

node('vets-website-linting') {
  checkout scm

  sh "mkdir -p build"

  def dockerImage = docker.build("vets-website:${env.BUILD_TAG}")
  def args = "-u root:root -v ${pwd()}/build:/application/build"

  stage('Security') {
    dockerImage.inside(args) {
      sh "cd /application && nsp check" 
    }
  }

  stage('Lint') {
    dockerImage.inside(args) {
      sh "cd /application && npm run lint"
    }
  }

  stage('Build') {
    if (isContentTeamUpdate()) {
      dockerImage.inside(args) {
        sh "cd /application && npm run build -- --buildtype=development"
      }
    } else {
      def builds = [:]

      for (int i=0; i<envNames.size(); i++) {
        def envName = envNames.get(i)

        builds[envName] = {
          dockerImage.inside(args) {
            sh "cd /application && npm run build -- --buildtype=${envName}"
            sh "cd /application && echo \"${buildDetails('buildtype': envName)}\" > build/${envName}/BUILD.txt" 
          }
        }
      }

      parallel builds
    }
  }

  stage('Unit') {
    def builds = [:]

    for (int i=0; i<envNames.size(); i++) {
      def envName = envNames.get(i)

      builds[envName] = {
        dockerImage.inside(args + " -e BUILDTYPE=${envName}") {
          sh "cd /application && npm run test:unit"
        }
      }
    }

    parallel builds
  }

  stage('E2E') {
    def builds = [:]

    for (int i=0; i<envNames.size(); i++) {
      def envName = envNames.get(i)

      builds[envName] = {
        dockerImage.inside(args + " -e BUILDTYPE=${envName}") {
          sh "cd /application && npm run test:e2e"
        }
      }
    }

    parallel builds
  }

  stage('Accessibility') {
    dockerImage.inside(args + " -e BUILDTYPE=development") {
      sh "cd /application && npm run test:accessibility"
    }
  }
}
