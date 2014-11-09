(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(me) {
            buf.push('<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a href="/" class="navbar-brand">Pool Party</a></div><ul class="nav navbar-nav"><li><a href="/">');
            if (me.isLoggedIn) {
                buf.push("Log out");
            } else {
                buf.push("Sign in / Sign up");
            }
            buf.push('</a></li><li><a href="/players">Players</a></li>');
            if (me.isLoggedIn) {
                if (me.isAdmin) {
                    buf.push('<li><a href="/match/add">Add match</a></li>');
                } else {
                    buf.push('<li><a href="/match/request">Challenge someone</a></li>');
                }
            }
            buf.push('</ul></div></nav><div class="container"><main data-hook="page-container"></main></div></body>');
        }).call(this, "me" in locals_for_with ? locals_for_with.me : typeof me !== "undefined" ? me : undefined);
        return buf.join("");
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // includes/formInput.jade compiled template
    templatizer["includes"]["formInput"] = function tmpl_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // includes/player.jade compiled template
    templatizer["includes"]["player"] = function tmpl_includes_player(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(me) {
            buf.push('<li class="player list-group-item">');
            if (me.isAdmin) {
                buf.push('<span class="btn-group pull-right"><a data-hook="action-edit" class="btn btn-default">Edit</a><a href="#" data-hook="action-delete" class="btn btn-danger">Delete</a></span>');
            }
            buf.push('<img data-hook="avatar" width="40" height="40"/><a data-hook="name"></a><h6 class="elo__header">Elo Rating</h6><span data-hook="elo" class="elo"></span><h6 class="matches__header">Matches</h6><span data-hook="wins" class="wins"></span>/<span data-hook="matches" class="total"></span></li>');
        }).call(this, "me" in locals_for_with ? locals_for_with.me : typeof me !== "undefined" ? me : undefined);
        return buf.join("");
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page logout"><h2>Welcome to the Sociomantic pool table Leaderboard — The Pool Party!</h2><div data-hook="auth-form"><h2>Log out</h2><form role="logout-form" class="form-signin"><h3 class="form-signin-heading">Sad to see you leave :(</h3><button type="submit" class="btn btn-lg btn-primary btn-block">Sign out</button></form></div></section>';
    };

    // pages/loginForm.jade compiled template
    templatizer["pages"]["loginForm"] = function tmpl_pages_loginForm() {
        return '<section class="page logout"><h2>Welcome to the Sociomantic pool table Leaderboard — The Pool Party!</h2><div data-hook="auth-form"><h2>Log in</h2><form role="login-form" class="form-signin"><fieldset data-hook="field-container"></fieldset><button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button><a href="register">Don\'t have an account yet?</a></form></div></section>';
    };

    // pages/logoutForm.jade compiled template
    templatizer["pages"]["logoutForm"] = function tmpl_pages_logoutForm() {
        return '<section class="page logout"><h2>Welcome to the Sociomantic pool table Leaderboard — The Pool Party!</h2><div data-hook="auth-form"><h2>Log out</h2><form role="logout-form" class="form-signin"><fieldset data-hook="field-container"></fieldset><button type="submit" class="btn btn-lg btn-primary btn-block">Sign out</button></form></div></section>';
    };

    // pages/matchAdd.jade compiled template
    templatizer["pages"]["matchAdd"] = function tmpl_pages_matchAdd() {
        return '<section class="page add-match"><h2>Add Match</h2><form data-hook="match-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="setmatch" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // pages/playerAdd.jade compiled template
    templatizer["pages"]["playerAdd"] = function tmpl_pages_playerAdd() {
        return '<section class="page add-player"><h2>Add Player</h2><p>The same form-view is used for both editing and creating new users.</p><form data-hook="player-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // pages/playerEdit.jade compiled template
    templatizer["pages"]["playerEdit"] = function tmpl_pages_playerEdit() {
        return '<section class="page edit-player"><h2>Edit Player</h2><p>The same form-view is used for both editing and creating new users.</p><form data-hook="player-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // pages/playerView.jade compiled template
    templatizer["pages"]["playerView"] = function tmpl_pages_playerView(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(me) {
            buf.push('<section class="page view-player"><h2 data-hook="name"></h2><img data-hook="avatar" width="80" height="80"/><span data-hook="elo"></span>');
            if (me.isAdmin) {
                buf.push('<div class="buttons"><a data-hook="edit" class="btn">Edit</a><button data-hook="delete" class="btn">Delete</button></div>');
            }
            buf.push("</section>");
        }).call(this, "me" in locals_for_with ? locals_for_with.me : typeof me !== "undefined" ? me : undefined);
        return buf.join("");
    };

    // pages/players.jade compiled template
    templatizer["pages"]["players"] = function tmpl_pages_players() {
        return '<section class="page pageOne"><h2>Players</h2><ul data-hook="players-list" class="list-group"></ul></section>';
    };

    // pages/registerForm.jade compiled template
    templatizer["pages"]["registerForm"] = function tmpl_pages_registerForm() {
        return '<div class="form-group"><form role="form" class="form-signin"><h3 class="form-signin-heading">You\'re only one step away from joining this awesome place!</h3><fieldset data-hook="field-container"></fieldset><button type="submit" class="btn btn-lg btn-primary btn-block">Register</button></form></div>';
    };

    return templatizer;
}));