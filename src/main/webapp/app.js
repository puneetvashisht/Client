
var app = angular.module('myApp', ['ngRoute', 'commonApp']);

console.log("Common Path is " + commonApp.path);

require(commonApp.path + "scripts/js/modal.js");
require(commonApp.path + "scripts/js/bootstrap.js");
require(commonApp.path + "scripts/js/holder.js");
require(commonApp.path + "scripts/js/application.js");
require(commonApp.path + "scripts/js/collapse.js");
require(commonApp.path + "scripts/js/hover-dropdown.js");
require(commonApp.path + "scripts/js/social.js");

app.directive('tkLeftPane', function ($templateCache) {
    return{
        restrict: 'E',
        templateUrl: 'tkhts/leftpane.html'
    }
})

app.directive('blink', function($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                function showElement() {
                    $element.css("display", "inline");
                    $timeout(hideElement, 1000);
                }

                function hideElement() {
                    $element.css("display", "none");
                    $timeout(showElement, 1000);
                }
                showElement();
            },
            template: '<span ng-transclude></span>',
            replace: true
        };
    });

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/index', {
                    templateUrl: 'all-tutorial.html',
                    controller: 'AppCtrl'
                }).

                otherwise({
                    redirectTo: '/index'
                });
            
//            $locationProvider.html5Mode(true);

        }]);

app.controller("AppCtrl", function ($scope) {
   $scope.path = commonApp.path;
  console.log("Path is : " +$scope.path);
    console.log($scope);
  $scope.customers = [
                      {
                          id: 1, title: 'Java',
                          technologies: [
                            { technology: 'What is Java ?', url: 'http://tkhts.com/tkhts/core-java/introduction/index.html#/index'},
                            { technology: 'Control Statements & Loops', url: 'http://tkhts.com/tkhts/core-java/control-statement-and-looping/index.html#/index'},
                            { technology: 'Data Types', url: 'http://tkhts.com/tkhts/core-java/data-type/index.html#/index'},
                            { technology: 'Object Oriented Programming', url: 'http://tkhts.com/tkhts/core-java/oops/index.html#/index'},
                            { technology: 'Packages', url: 'http://tkhts.com/tkhts/core-java/packages/index.html#/index'},
                            { technology: 'Static', url: 'http://tkhts.com/tkhts/core-java/static/index.html#/index'},
                            { technology: 'JDBC', url: 'http://tkhts.com/tkhts/core-java/jdbc/index.html#/index'},
                            { technology: 'Internationalization', url: 'http://tkhts.com/tkhts/core-java/internationalization/index.html#/index'},
                          ]
                        },
                        {
                          id: 2, title: 'Advance Java', alias:'J2EE',
                          technologies: [
                            { technology: 'Collection', url: 'http://tkhts.com/tkhts/core-java/collection/index.html#/index'},
                            { technology: 'Exception Handling', url: 'http://tkhts.com/tkhts/core-java/exception-handling/index.html#/index'},
                            { technology: 'Multithreading', url: 'http://tkhts.com/tkhts/core-java/multithreading/index.html#/index'},
                            { technology: 'AWT', url: 'http://tkhts.com/tkhts/awt-swing/awt/index.html#/awt-index'},
                            { technology: 'Swing', url: 'http://tkhts.com/tkhts/awt-swing/swing/index.html#/swing-index'},
                            { technology: 'Servlet', url: 'http://tkhts.com/tkhts/web/servlet/index.html#/servlet-index'},
                            { technology: 'JSP', url: 'http://tkhts.com/tkhts/web/jsp/index.html#/jsp-index'},
                            { technology: 'EJB', url: 'http://tkhts.com/tkhts/ejb/index.html#/ejb-index'},
                          ]
                        },
                        {
                          id: 3, title: 'Struts 2.x',
                          technologies: [
                            { technology: 'What is MVC ?', url: 'http://tkhts.com/tkhts/web/struts-2.x/index.html#/struts-introduction'},
                            { technology: 'Why MVC ?', url: 'http://tkhts.com/tkhts/web/struts-2.x/index.html#/mvc-introduction'},
                            { technology: 'Architecture of Struts 2', url: 'http://tkhts.com/tkhts/web/struts-2.x/index.html#/struts-architecture'},
                            { technology: 'Struts First Application', url: 'http://tkhts.com/tkhts/web/struts-2.x/index.html#/struts-architecture#tp1'},
                            { technology: 'Struts1.x Vs Struts 2.x', url: 'http://tkhts.com/tkhts/web/struts-2.x/index.html#/struts1.x-struts2.x-difference'},
                            { technology: 'IoC & Dependency Injection', url: 'http://tkhts.com/tkhts/web/struts-2.x/index.html#/struts-with-freemarker#tp1'},
                            { technology: 'Interceptor', url: 'http://tkhts.com/tkhts/web/struts-2.x/index.html#/struts-interceptor'},
                            { technology: 'Exception Handling', url: 'http://tkhts.com/tkhts/web/struts-2.x/index.html#/struts-exception-handling'},
                          ]
                        },
                        {
                          id: 4, title: 'Android',
                          technologies: [
                            { technology: 'What is Android ?', url: 'http://tkhts.com/tkhts/android/index.html#/android-intro'},
                            { technology: 'Features of Android', url: 'http://tkhts.com/tkhts/android/index.html#/android-intro#tp1'},
                            { technology: 'Android Versions', url: 'http://tkhts.com/tkhts/android/index.html#/android-versions'},
                            { technology: 'Setting Up Android', url: 'http://tkhts.com/tkhts/android/index.html#/android-setup'},
                            { technology: 'Android Architecture', url: 'http://tkhts.com/tkhts/android/index.html#/android-architecture'},
                            { technology: 'Application Fundamentals', url: 'http://tkhts.com/tkhts/android/index.html#/application-fundamentals'},
                            { technology: 'Android Hello_World Example', url: 'http://tkhts.com/tkhts/android/index.html#/android_hello_world_example'},
                            { technology: 'Android Examples', url: 'http://tkhts.com/tkhts/android/index.html#/android_examples'},
                          ]
                        },
                        {
                            id: 7, title: 'CSS',
                            technologies: [
                              { technology: 'CSS Introduction', url: 'http://tkhts.com/tkhts/web/css/index.html#/css-introduction'},
                              { technology: 'CSS Syntax', url: 'http://tkhts.com/tkhts/web/css/index.html#/css-syntax'},
                              { technology: 'CSS Selectors', url: 'http://tkhts.com/tkhts/web/css/index.html#/css-selectors'},

                            ]
                         },
                          {
                               id: 11, title: 'JPA',
                               technologies: [
                                 { technology: 'JPA Introduction', url: 'http://tkhts.com/tkhts/orm-tools/jpa/index.html#/jpa_introduction'},
                                 { technology: 'Why JPA', url: 'http://tkhts.com/tkhts/orm-tools/jpa/index.html#/jpa_introduction#tp1'},
                                 { technology: 'JPA Implementation', url: 'http://tkhts.com/tkhts/orm-tools/jpa/index.html#/jpa_implementation'},
                               ]
                         },
                           {
                             id: 14, title: 'J2EE Design Pattern',
                             technologies: [
                               { technology: 'J2EE Design Patterns', url: 'http://tkhts.com/tkhts/design-patterns/j2ee-design-pattern/index.html#/j2ee-design-pattern'},
                               { technology: 'Business Layer', url: 'http://tkhts.com/tkhts/design-patterns/j2ee-design-pattern/index.html#/j2ee-design-pattern-business-layer'},
                               { technology: 'Integration Layer', url: 'http://tkhts.com/tkhts/design-patterns/j2ee-design-pattern/index.html#/j2ee-design-pattern-integration-layer'},
                             ]
                           },
                         {
                             id: 13, title: 'Design Pattern',
                             technologies: [
                               { technology: 'Design Patterns', url: 'http://tkhts.com/tkhts/design-patterns/index.html#/design-pattern-introduction#tp1'},
                               { technology: 'Creational Patterns', url: 'http://tkhts.com/tkhts/design-patterns/index.html#/creational-design-pattern'},
                               { technology: 'Structural Patterns', url: 'http://tkhts.com/tkhts/design-patterns/index.html#/structural-design-pattern'},
                               { technology: 'Behavioral Patterns', url: 'http://tkhts.com/tkhts/design-patterns/index.html#/behavioral-design-pattern'},
                             ]
                           },
                           {
                               id: 9, title: 'MyBatis',
                               technologies: [
                                 { technology: 'MyBatis 3.0', url: 'http://tkhts.com/tkhts/orm-tools/myBatis/index.html#/my_batis_3.0'},
                                 { technology: 'MyBatis vs Hibernate', url: 'http://tkhts.com/tkhts/orm-tools/myBatis/index.html#/my_batis_3.0#tp1'},
                                 { technology: 'Setting up MyBatis', url: 'http://tkhts.com/tkhts/orm-tools/myBatis/index.html#/my_batis_3.0#tp2'},
                                 { technology: 'Creating CRUD Operation', url: 'http://tkhts.com/tkhts/orm-tools/myBatis/index.html#/my_batis_CRUD_Operation'},
                                 { technology: 'Testing the MyBatis Application', url: 'http://tkhts.com/tkhts/orm-tools/myBatis/index.html#/my_batis_test_application'},
                               ]
                            },
                           {
                        	      id: 5, title: 'HTML 5',
                        	      technologies: [
                        	        { technology: 'HTML 5 Features', url: 'http://tkhts.com/tkhts/web/html5/index.html#/html5-introduction#html5feature'},
                        	        { technology: 'HTML 5 Syntax', url: 'http://tkhts.com/tkhts/web/html5/index.html#/html5-syntax'},
                        	        { technology: 'Removed Tags from HTML5', url: 'http://tkhts.com/tkhts/web/html5/index.html#/html5-syntax#htmltag'},
                        	        { technology: 'HTML 5 Tags', url: 'http://tkhts.com/tkhts/web/html5/index.html#/html5-tags'},
                        	        { technology: 'HTML5 Attributes', url: 'http://tkhts.com/tkhts/web/html5/index.html#/html5-attribute'},
                        	        { technology: 'HTML5 Elements', url: 'http://tkhts.com/tkhts/web/html5/index.html#/html5-input-elements'},
                        	        { technology: 'HTML Multimedia Tags', url: 'http://tkhts.com/tkhts/web/html5/index.html#/html5-audio-tag'},
                        	      ]
                        	    },
                           {
                          id: 6, title: 'Bootstrap',
                          technologies: [
                            { technology: 'Scaffolding & Typography', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-scaffolding'},
                            { technology: 'Table, Forms, Buttons, Images', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-code-table'},
                            { technology: 'Dropdowns and ButtonGroup', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-dropdowns-buttongroup-buttondropdowns'},
                            { technology: 'Navs, Navbars and Breadcrumps', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-navs-navbar-breadcrumps'},
                            { technology: 'Pagination, Labels and badges', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-pagination-labelsanbadges-typography-thumbnails'},
                            { technology: 'Alerts, Progressbars, Mediaobject', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-alerts-progressbars-mediaobject-misc'},
                            { technology: 'scrollspy, tab, tooltip and popover', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-scrollspy-tab-tooltip-popover'},
                            { technology: 'Modal, Accordian, Affix', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-overview-transitions-modal-dropdown'},
                            { technology: 'Javascript Carousel, Typehead', url: 'http://tkhts.com/tkhts/web/bootstrap/index.html#/bootstrap-carousel-typeahead-affix'},
                          ]
                        },
                        {
                          id: 8, title: 'Spring',
                          technologies: [
                            { technology: 'Spring Framework', url: 'http://tkhts.com/tkhts/spring/index.html#/spring-introduction'},
                            { technology: 'Spring Architecture', url: 'http://tkhts.com/tkhts/spring/index.html#/spring-introduction#tp2'},
                            { technology: 'Spring IoC Containers', url: 'http://tkhts.com/tkhts/spring/index.html#/spring_container'},
                            { technology: 'Spring Injections', url: 'http://tkhts.com/tkhts/spring/index.html#/spring_constructor_injection'},
                            { technology: 'Spring Bean Scopes', url: 'http://tkhts.com/tkhts/spring/index.html#/spring_bean_scope'},
                            { technology: 'Spring Collection Dependencies', url: 'http://tkhts.com/tkhts/spring/index.html#/spring_collection_dependency'},
                            { technology: 'Spring Factory Bean', url: 'http://tkhts.com/tkhts/spring/index.html#/spring_factory_bean'},
                            { technology: 'Spring Annotations', url: 'http://tkhts.com/tkhts/spring/index.html#/spring_annotation'},
                            { technology: '@PostContruct & @PreDestroy', url: 'http://tkhts.com/tkhts/spring/index.html#/spring_postconstruct_predestroy'},
                            { technology: 'Spring AOP', url: 'http://tkhts.com/tkhts/spring/index.html#/spring_aop_introduction'},
                          ]
                        },
                          {
                            id: 12, title: 'Open Source',
                            technologies: [
                              { technology: 'Quartz', url: 'http://tkhts.com/tkhts/open-source/quartz/index.html#/quartz-index'},
                              { technology: 'i-Text', url: 'http://tkhts.com/tkhts/open-source/i-text/index.html#/itext-index'},
                              { technology: 'Logging', url: 'http://tkhts.com/tkhts/open-source/logging/index.html#/logging-index'},
                              { technology: 'JFreeChart', url: 'http://tkhts.com/tkhts/open-source/JFreeChart/index.html#/jfreechart'},
                              { technology: 'Apache POI', url: 'http://tkhts.com/tkhts/open-source/poi/index.html#/poi-index'},
                              { technology: 'AspectJ', url: 'http://tkhts.com/tkhts/open-source/aspectj/index.html#/aspectj-index'},
                              { technology: 'Java Mail API', url: 'http://tkhts.com/tkhts/open-source/java_mail/index.html#/java-mail'},
                              { technology: 'JMF', url: 'http://tkhts.com/tkhts/open-source/jmf/index.html#/jmf-index'},
                            ]
                          },
                          {
                              id: 16, title: 'PHP Symfony Framework',
                              technologies: [
                                { technology: 'PHP Symfony Framework', url: 'http://tkhts.com/tkhts/php/symfony/index.html#/symfony-introduction'},
                                { technology: 'Symfony Application Flow', url: 'http://tkhts.com/tkhts/php/symfony/index.html#/application-flow'},
                                { technology: 'Symfony Vs Simple PHP', url: 'http://tkhts.com/tkhts/php/symfony/index.html#/symfony2-vs-php'},
                                { technology: 'Installing a Symfony', url: 'http://tkhts.com/tkhts/php/symfony/index.html#/symfony-install'},
                                { technology: 'Controller', url: 'http://tkhts.com/tkhts/php/symfony/index.html#/controller'},
                                { technology: 'Routing', url: 'http://tkhts.com/tkhts/php/symfony/index.html#/routing'},
                                { technology: 'Templates', url: 'http://tkhts.com/tkhts/php/symfony/index.html#/template'},
                                { technology: 'DataBases and Doctrine', url: 'http://tkhts.com/tkhts/php/symfony/index.html#/database-doctrine'},
                              ]
                            },
                            {
                                id: 11, title: 'SQL',
                                technologies: [
                                  { technology: 'SQL Database', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/database-introduction'},
                                  { technology: 'MySQL installation', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/mysql-install'},
                                  { technology: 'Data Types in MySQL', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/mysql-queries'},
                                  { technology: 'MySQL Retrieve Clause', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/mysql-retrieve-info'},
                                  { technology: 'MySQL JOIN', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/mysql-join'},
                                  { technology: 'MySQL DB Function', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/mysql-function'},
                                  { technology: 'MySQL Procedure', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/mysql-procedure'},
                                  { technology: 'Import and Export', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/mysql-import-export'},
                                  { technology: 'MySql Queries', url: 'http://tkhts.com/tkhts/sql/mysql/index.html#/sql_all_commands'},
                                ]
                              },
                              {
                                  id: 11, title: 'Interview Questions',
                                  technologies: [
                                    { technology: 'OOPS', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/oop-basic'},
                                    { technology: 'String', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/string-basics'},
                                    { technology: 'JDBC', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/jdbc'},
                                    { technology: 'File Handling', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/file-handling-basics'},
                                    { technology: 'Exception Handling', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/exception-handling-basics'},
                                    { technology: 'Collections', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/collection-basics'},
                                    { technology: 'Multithreading', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/multithreading'},
                                    { technology: 'AWT', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/awt-basic'},
                                    { technology: 'Swing', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/swing'},
                                    { technology: 'Servlet', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/servlet-basic'},
                                    { technology: 'JSP', url: 'http://tkhts.com/tkhts/interview-questions/index.html#/jsp-basics'},
                                  ]
                                },
                          {
                            id: 10, title: 'Hibernate',
                            technologies: [
                              { technology: 'Hibernate Introduction', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-introduction'},
                              { technology: 'Why Hibernate?', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-why'},
                              { technology: 'Configure Hibernate', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-first-example'},
                              { technology: 'Hibernate Framework Objects', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-objects'},
                              { technology: 'Hibernate Life cycle', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-life-cycle'},
                              { technology: 'Hibernate Annotations Example', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/simple-hibernate-annotation-example'},
                              { technology: 'Hibernate Datatypes', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-datatypes'},
                              { technology: 'HQL', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hql'},
                              { technology: 'Application Architecture', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-abstractdao'},
                              { technology: 'Hibernate Criteria Queries', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-criteria-api'},
                              { technology: 'Hibernate Fetching Strategies', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-fetching-technique'},
                              { technology: 'Hibernate Caching', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/hibernate-caching-strategy'},
                              { technology: 'Hibernate Videos Tutorial', url: 'http://tkhts.com/tkhts/orm-tools/hibernate/index.html#/videos'},
                            ]
                          },
                          {
                            id: 15, title: 'PHP',
                            technologies: [
                              { technology: 'PHP Introduction', url: 'http://tkhts.com/tkhts/php/index.html#/introduction'},
                              { technology: 'Data Type', url: 'http://tkhts.com/tkhts/php/index.html#/datatype'},
                              { technology: 'Variables', url: 'http://tkhts.com/tkhts/php/index.html#/variable'},
                              { technology: 'Looping', url: 'http://tkhts.com/tkhts/php/index.html#/looping'},
                              { technology: 'Branching', url: 'http://tkhts.com/tkhts/php/index.html#/branching'},
                              { technology: 'Function', url: 'http://tkhts.com/tkhts/php/index.html#/function'},
                              { technology: 'Array', url: 'http://tkhts.com/tkhts/php/index.html#/array'},
                              { technology: 'Forms', url: 'http://tkhts.com/tkhts/php/index.html#/forms'},
                              { technology: 'OOPS', url: 'http://tkhts.com/tkhts/php/index.html#/oops'},
                              { technology: 'Access Modifiers', url: 'http://tkhts.com/tkhts/php/index.html#/accessmodifier'},
                              { technology: 'Encapsulation', url: 'http://tkhts.com/tkhts/php/index.html#/encapsulation'},
                              { technology: 'Inheritance', url: 'http://tkhts.com/tkhts/php/index.html#/inheritance'},
                              { technology: 'Polymorphism', url: 'http://tkhts.com/tkhts/php/index.html#/polymorphism'},
                              { technology: 'Interface', url: 'http://tkhts.com/tkhts/php/index.html#/interface'},
                              { technology: 'Exception Handling', url: 'http://tkhts.com/tkhts/php/index.html#/exception'},
                              { technology: 'PHP Examples', url: 'http://tkhts.com/tkhts/php/index.html#/examples'},
                            ]
                          }
                      ];
});




function require(script) {
  $.ajax({
    url: script,
    dataType: "script",
    async: true,           // <-- This is the key
    cache: true,
    success: function () {
      console.log('Loaded' + script)
    },
    error: function () {
      throw new Error("Could not load script " + script);
    }
  });

}
