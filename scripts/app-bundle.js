define('app',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function App(http) {
            _classCallCheck(this, App);

            http.configure(function (config) {
                config.withBaseUrl('http://localhost:8080/api/').withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                });
            });

            this.http = http;
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
            config.title = 'Dirlididi';

            config.map([{ route: ['', 'home'], name: 'home',
                moduleId: './home', nav: true, title: 'Welcome' }, { route: 'problemas', name: 'problemas',
                moduleId: './problemas', nav: true, title: 'Problems' }]);

            this.router = router;
        };

        return App;
    }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function Home(http) {
            _classCallCheck(this, Home);

            this.http = http;
            this.submitters = 1;
            this.problems = 1;
            this.getStatsGlobalJson();
        }

        Home.prototype.getStatsGlobalJson = function getStatsGlobalJson() {
            var _this = this;

            this.http.fetch('stats/global').then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.submitters = data.submitters;
                _this.problems = data.problems;
            });
        };

        return Home;
    }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('problemas',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Problemas = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Problemas = exports.Problemas = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function Problemas(http) {
            _classCallCheck(this, Problemas);

            this.http = http;

            this.pageSize = 10;
            this.startIndex = 0;
            this.endIndex = this.pageSize;

            this.disableStart = true;
            this.disableEnd = false;

            this.problemasCount = 0;

            this.allProblems = [];

            this.currentProblems();
        }

        Problemas.prototype.currentProblems = function currentProblems() {
            this.getProblems(this.startIndex, this.endIndex);
        };

        Problemas.prototype.prevProblems = function prevProblems() {
            this.startIndex = this.startIndex - this.pageSize;
            this.endIndex = this.endIndex - this.pageSize;

            if (this.startIndex == 0) {
                this.disableStart = true;
                this.getProblems(this.startIndex, this.endIndex);
            } else {
                this.disableEnd = false;
                this.getProblems(this.startIndex, this.endIndex);
            }
        };

        Problemas.prototype.nextProblems = function nextProblems() {
            this.startIndex = this.startIndex + this.pageSize;
            this.endIndex = this.endIndex + this.pageSize;

            if (this.endIndex === this.problemasCount) {

                this.disableEnd = true;
                this.getProblems(this.startIndex, this.endIndex);
            } else {
                this.disableStart = false;
                this.getProblems(this.startIndex, this.endIndex);
            }
        };

        Problemas.prototype.getProblems = function getProblems(startIDX, endIDX) {
            var _this = this;

            this.http.fetch('problem/pagination/?startIndex=' + startIDX + '&endIndex=' + endIDX).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.allProblems = data;
            });

            this.http.fetch('stats/global').then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.problemasCount = data.problems;
            });
        };

        return Problemas;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container\">\n        <div id=\"custom-bootstrap-menu\" class=\"navbar navbar-default \"\n             role=\"navigation\">\n            <div class=\"container-fluid\">\n                <div class=\"navbar-header\">\n                    <a class=\"navbar-brand\" href=\"/\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span> Dirlididi</a>\n                    <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\"\n                            data-target=\".navbar-menubuilder\">\n                        <span class=\"sr-only\">Toggle navigation</span><span\n                            class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span\n                            class=\"icon-bar\"></span>\n                    </button>\n                </div>\n                <div class=\"collapse navbar-collapse navbar-menubuilder\">\n                    <ul class=\"nav navbar-nav navbar-left\">\n                        <li repeat.for = \"row of router.navigation\">\n                            <a href.bind = \"row.href\">${row.title}</a>\n                        </li>\n                    </ul>\n                    <ul class=\"nav navbar-nav navbar-right\">\n                        <li><a href=\"#\">Login</a></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <router-view></router-view>\n    </div>\n</template>\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"jumbotron\">\r\n        <h1>Solve problems to learn program skills!</h1>\r\n        <h2>Global Stats</h2>\r\n        <ul>\r\n            <li>${problems} problems</li>\r\n            <li>${submitters} submitters</li>\r\n        </ul>\r\n        <h2>Your stats!</h2>\r\n        <ul>\r\n            <li>problems solved</li>\r\n        </ul>\r\n    </div>\r\n</template>"; });
define('text!problemas.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"table-responsive\">\r\n    <table class=\"table table-striped\">\r\n            <thead>\r\n            <tr>\r\n                <th>Problem</th>\r\n                <th>Description</th>\r\n                <th>Key</th>\r\n                <th>Created</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr repeat.for=\"problems of allProblems\">\r\n                <td><a href=\"#\">${problems.nome}</a></td>\r\n                <td><a href=\"#\">${problems.descricao}</a></td>\r\n                <td><a href=\"#\">${problems.id}</a></td>\r\n                <td>${problems.data}</td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <div class=\"col-md-12 text-center\">\r\n        <ul class=\"pagination pagination-lg\">\r\n            <!--<li><a href=\"#\" id=\"btnPrev\" disabled.bind=disableStart value=\"<\" click.delegate = \"prevProblems()\"><span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span></a></li>-->\r\n            <!--<li><a href=\"#\" id=\"btnNext\" disabled.bind=disableEnd value=\">\" click.delegate = \"nextProblems()\"><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span></a></li>-->\r\n            <li><input type=\"button\" id=\"btnPrev\" class=\"btn btn-lg\" disabled.bind=disableStart value=\"<\" click.delegate = \"prevProblems()\"/></li>\r\n            <li><input type=\"button\" id=\"btnNext\" class=\"btn btn-lg\" disabled.bind=disableEnd value=\">\" click.delegate = \"nextProblems()\"/></li>\r\n        </ul>\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map