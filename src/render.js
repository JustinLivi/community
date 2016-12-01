'use strict';

const raf = require( 'raf' );

module.exports = function createSketch( canvas ) {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext( '2d' );
    const fps = 60;
    const fpsInterval = 1000 / fps;

    let frames = 0;
    let now;
    let elapsed;
    let then = window.performance.now();

    const nodecount = 100;
    const nodes = [];
    const speed = [];

    function random( low, high ) {
        let h = high;
        let l = low;
        if ( arguments.length === 1 ) {
            h = low;
            l = 0;
        }
        return ( h - l ) * Math.random() + l;
    }

    function dist( x1, y1, x2, y2 ) {
        return Math.sqrt( Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1, 2 ));
    }

    function line( x1, y1, x2, y2 ) {
        ctx.beginPath();
        for ( let count = 0; count < 20; count++ ) {
            ctx.rect( x1 + count * ( x2 - x1 ) / 20, y1 + count * ( y2 - y1 ) / 20, 1, 1 );
        }
        ctx.fill();
    }

    class CNode {

        constructor() {
            this.optimal = random( 20 );
            this.theta = random( 360 );
            this.loc = {
                x: random( width ),
                y: random( height ),
            };
            this.vel = {
                x: 0,
                y: 0,
            };
            this.grey = random( 255 );
            this.alpha = random( 10, 70 ) / 255;
        }

        update() {
            this.grey += random( -1, 1 );
            this.loc.x += this.vel.x;
            this.loc.y += this.vel.y;
            const grey = Math.round( this.grey );
            ctx.fillStyle = `rgba(${grey},${grey},${grey},${this.alpha})`;
        }
    }

    function reset() {
        frames = 0;
        ctx.clearRect( 0, 0, width, height );
        for ( let count = 0; count < nodecount; count++ ) {
            nodes[count] = new CNode();
            speed[count] = random( 0.1, 3 );
        }
    }

    function findFarthest( n, c ) {
        let farthest = null;
        let distance = 0;
        for ( let count = 0; count < nodecount; count++ ) {
            if ( Math.abs( dist( n[count].loc.x, n[count].loc.y, n[c].loc.x, n[c].loc.y ) - n[c].optimal ) > distance && count !== c ) {
                farthest = n[count];
                distance = Math.abs( dist( n[count].loc.x, n[count].loc.y, n[c].loc.x, n[c].loc.y ) - n[c].optimal );
            }
        }
        return farthest;
    }

    function findClosest( n, c ) {
        let closest = null;
        let distance = 100000;
        for ( let count = 0; count < nodecount; count++ ) {
            if ( Math.abs( dist( n[count].loc.x, n[count].loc.y, n[c].loc.x, n[c].loc.y ) - n[c].optimal ) < distance && count !== c ) {
                closest = n[count];
                distance = Math.abs( dist( n[count].loc.x, n[count].loc.y, n[c].loc.x, n[c].loc.y ) - n[c].optimal );
            }
        }
        return closest;
    }

    function optimizeFarthest( count ) {
        const farthest = findFarthest( nodes, count );
        if ( farthest !== null ) {
            const distance = dist( nodes[count].loc.x, nodes[count].loc.y, farthest.loc.x, farthest.loc.y );
            if ( distance < nodes[count].optimal ) {
                nodes[count].vel.x = -( farthest.loc.x - nodes[count].loc.x ) / ( distance / speed[count]);
                nodes[count].vel.y = -( farthest.loc.y - nodes[count].loc.y ) / ( distance / speed[count]);
            }
            else {
                nodes[count].vel.x = ( farthest.loc.x - nodes[count].loc.x ) / ( distance / speed[count]);
                nodes[count].vel.y = ( farthest.loc.y - nodes[count].loc.y ) / ( distance / speed[count]);
            }
            nodes[count].update();
            line( farthest.loc.x, farthest.loc.y, nodes[count].loc.x, nodes[count].loc.y );
        }
    }

    function optimizeClosest( count ) {
        const closest = findClosest( nodes, count );
        if ( closest !== null ) {
            const distance = dist( nodes[count].loc.x, nodes[count].loc.y, closest.loc.x, closest.loc.y );
            if ( distance < nodes[count].optimal ) {
                nodes[count].vel.x = -( closest.loc.x - nodes[count].loc.x ) / ( distance / speed[count]);
                nodes[count].vel.y = -( closest.loc.y - nodes[count].loc.y ) / ( distance / speed[count]);
            }
            else {
                nodes[count].vel.x = ( closest.loc.x - nodes[count].loc.x ) / ( distance / speed[count]);
                nodes[count].vel.y = ( closest.loc.y - nodes[count].loc.y ) / ( distance / speed[count]);
            }
            nodes[count].update();
            line( closest.loc.x, closest.loc.y, nodes[count].loc.x, nodes[count].loc.y );
        }
    }

    function draw() {
        for ( let count = 0; count < nodecount; count++ ) {
            optimizeFarthest( count );
            optimizeClosest( count );
            ctx.rect( nodes[count].loc.x, nodes[count].loc.y, 3, 3 );
            ctx.fill();
        }
    }

    function animate() {
        raf( animate );
        if ( frames > 500 ) return;
        frames++;
        now = window.performance.now();
        elapsed = now - then;

        if ( elapsed > 2000 ) {
            then = now - ( elapsed % fpsInterval );
        }
        else if ( elapsed > fpsInterval ) {
            then = now - ( elapsed % fpsInterval );
            draw( 1 + ( elapsed - fpsInterval ) / fpsInterval );
        }
    }

    canvas.addEventListener( 'click', reset );

    reset();
    animate();
};
