var player = 1;
var scores = [0,0,0];

var VoronoiDemo = {
    voronoi: new Voronoi(),
    sites: [],
    diagram: null,
    margin: 100,
    canvas: null,
    bbox: {
        xl: 0,
        xr: 800,
        yt: 0,
        yb: 600
    },

    normalizeEventCoords: function (target, e) {
        // http://www.quirksmode.org/js/events_properties.html#position
        // =====
        if (!e) {
            e = self.event;
        }
        var x = 0;
        var y = 0;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else if (e.clientX || e.clientY) {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        // =====
        return {
            x: x - target.offsetLeft,
            y: y - target.offsetTop
        };
    },

    init: function () {
        var me = this;
        this.canvas = document.getElementById('voronoiCanvas');
        this.canvas.onmousemove = function (e) {
            if (!me.sites.length) {
                return;
            }
            var site = me.sites[0];
            var mouse = me.normalizeEventCoords(me.canvas, e);
            site.x = mouse.x;
            site.y = mouse.y;
            me.diagram = me.voronoi.compute(me.sites, me.bbox);
            me.render();
        };
        this.canvas.onclick = function (e) {
            var mouse = me.normalizeEventCoords(me.canvas, e);
            me.addSite(mouse.x, mouse.y);
            me.render();
        };
        // for kicks, start with random value??
        // this.randomSites(5, true);
        this.render();
    },

    clearSites: function () {
        // we want at least one site, the one tracking the mouse
        this.sites = [{
            x: 0,
            y: 0,
            owner: -1 // neutral start
        }];
        this.diagram = this.voronoi.compute(this.sites, this.bbox);
    },

    randomSites: function (n, clear) {
        if (clear) {
            this.sites = [];
        }
        var xo = this.margin;
        var dx = this.canvas.width - this.margin * 2;
        var yo = this.margin;
        var dy = this.canvas.height - this.margin * 2;
        for (var i = 0; i < n; i++) {
            this.sites.push({
                x: self.Math.round(xo + self.Math.random() * dx),
                y: self.Math.round(yo + self.Math.random() * dy),
                owner: -1 // neutral start
            });
        }
        this.diagram = this.voronoi.compute(this.sites, this.bbox);
    },

    addSite: function (x, y) {
        this.sites.push({
            x: x,
            y: y,
            owner: player
        });
        //creates a new diagram each time...
        this.diagram = this.voronoi.compute(this.sites, this.bbox);

        // recompute vertices from each cell
        this.diagram.cells.forEach(cell => {
            cell.vertices = [];
            cell.halfedges.forEach(he => cell.vertices.push(he.getStartpoint()))
            if(player>=0){
                // compute area and add to score
                score[player] += polyArea(cell.vertices, false);
            }
        });

        // toggle player
        player = player===1 ? 2 : 1;
    },

    render: function () {
        var ctx = this.canvas.getContext('2d');
        // background
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#888';
        ctx.stroke();
        // voronoi
        if (!this.diagram) {
            return;
        }
        ctx.strokeStyle = '#000';
        // edges
        var edges = this.diagram.edges,
            nEdges = edges.length,
            v;
        if (nEdges) {
            var edge;
            ctx.beginPath();
            while (nEdges--) {
                edge = edges[nEdges];
                v = edge.va;
                ctx.moveTo(v.x, v.y);
                v = edge.vb;
                ctx.lineTo(v.x, v.y);
            }
            ctx.stroke();
        }
        // how many sites do we have?
        var sites = this.sites,
            nSites = sites.length;
        if (!nSites) {
            return;
        }
        // highlight cell under mouse
        var cell = this.diagram.cells[this.sites[0].voronoiId];

        // there is no guarantee a Voronoi cell will exist for any
        // particular site
        if (cell) {
            var halfedges = cell.halfedges,
                nHalfedges = halfedges.length;
            if (nHalfedges > 2) {
                v = halfedges[0].getStartpoint();
                ctx.beginPath();
                ctx.moveTo(v.x, v.y);
                for (var iHalfedge = 0; iHalfedge < nHalfedges; iHalfedge++) {
                    v = halfedges[iHalfedge].getEndpoint();
                    ctx.lineTo(v.x, v.y);
                }
                // switch player color based on owner
                if(cell.owner <0 )
                    ctx.fillStyle = '#aaa'; // noone owns
                else if(cell.owner === 1)
                    ctx.fillStyle = '#faa'; // p1
                else if(cell.owner === 2)
                    ctx.fillStyle = '#afa'; // p2
                ctx.fill();
            }
        }
        // draw sites
        var site;
        ctx.beginPath();
        ctx.fillStyle = '#44f';
        while (nSites--) {
            site = sites[nSites];
            ctx.rect(site.x - 2 / 3, site.y - 2 / 3, 2, 2);
        }
        ctx.fill();
    },
};