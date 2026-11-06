// App start-up: show login, or restore the saved session
setMode("login");
(function(){const m=store.get("mq_session"),u=m&&users()[m];if(u)enter(m,u.name)})();
