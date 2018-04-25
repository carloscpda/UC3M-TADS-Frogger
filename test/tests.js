function test_keyPress(event) {
    var keyCode = event.keyCode;
    if(keyCode === 38) {
        test_frog = new Frog(width / 2, height - grid_size, grid_size);

        prev_pos = test_frog.y;
        test_frog.move(0, -grid_size);
        real_pos = test_frog.y;
        expected_pos = prev_pos - grid_size;

        QUnit.test( "PS-741: Key pressed UP all ok", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });

        test_frog.move(0, - 8 * grid_size);
        real_pos = test_frog.y;
        expected_pos = 0;
        QUnit.test( "PS-745: Key pressed UP out of bounds", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });
    } else if(keyCode === 40) {
        test_frog = new Frog(width / 2, 0, grid_size);

        prev_pos = test_frog.y;
        test_frog.move(0, grid_size);
        real_pos = test_frog.y;
        expected_pos = prev_pos + grid_size;

        QUnit.test( "PS-742: Key pressed DOWN all ok", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });

        test_frog.move(0, 8 * grid_size);
        real_pos = test_frog.y;
        expected_pos = height;
        QUnit.test( "PS-746: Key pressed DOWN out of bounds", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });
    } else if(keyCode === 39){
        test_frog = new Frog(0, 0, grid_size);
        prev_pos = test_frog.x;

        obs = new Obstacle(0, grid_size, 100, grid_size, 2);
        test_frog.attach(obs);
        obs.update();
        test_frog.update();
        real_pos = test_frog.x;

        expected_pos = prev_pos + 2;

        QUnit.test( "PS-744: Key pressed RIGHT all ok", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });

        obs = new Obstacle(2, grid_size, 100, grid_size, width);
        test_frog.attach(obs);
        obs.update();
        test_frog.update();
        real_pos = test_frog.x;
        expected_pos = width - grid_size;
        QUnit.test( "PS-748: Key pressed RIGHT out of bounds", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });
    } else if(keyCode === 37){
        test_frog = new Frog(width-grid_size, 0, grid_size);
        prev_pos = test_frog.x;

        obs = new Obstacle(width-grid_size, grid_size, 100, grid_size, -2);
        test_frog.attach(obs);
        obs.update();
        test_frog.update();
        real_pos = test_frog.x;

        expected_pos = prev_pos - 2;

        QUnit.test( "PS-743: Key pressed LEFT all ok", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });

        obs = new Obstacle(width-grid_size, grid_size, 100, grid_size, -width);
        test_frog.attach(obs);
        obs.update();
        test_frog.update();
        real_pos = test_frog.x;
        expected_pos = 0;
        QUnit.test( "PS-747: Key pressed LEFT out of bounds", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });
    } else {
        test_frog = new Frog(500 / 2, 1050 - 50, 50);

        prev_pos = test_frog.x;
        test_frog.move(0, 0);
        real_pos = test_frog.x;
        expected_pos = prev_pos;
        QUnit.test( "PS-744: Key pressed OTHER", function( assert ) {
            assert.deepEqual(real_pos, expected_pos, "Passed" );
        });
    }

    return true
}

window.onload = function() {
    // Rectangle class test
    QUnit.module('MOD-100: Rectangle class test');

    QUnit.test( "PS-111: Rectangle constructor all ok", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec = new Rectangle(x_rec, y_rec, r_width, r_height);
        assert.deepEqual(rec.x, x_rec, "Passed");
        assert.deepEqual(rec.y, y_rec, "Passed");
        assert.deepEqual(rec.w, r_width, "Passed");
        assert.deepEqual(rec.h, r_height, "Passed");
    });
    QUnit.test( "PS-112: Rectangle constructor width bigger than canvas width", function( assert ) {
        x_rec = width*2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec = new Rectangle(x_rec, y_rec, r_width, r_height);
        assert.deepEqual(rec.x, x_rec, "Passed");
    });
    QUnit.test( "PS-113: Rectangle constructor height bigger than canvas height", function( assert ) {
        x_rec = width;
        y_rec = grid_size*8*16;
        r_width = grid_size;
        r_height = grid_size;
        rec = new Rectangle(x_rec, y_rec, r_width, r_height);
        assert.deepEqual(rec.y, y_rec, "Passed");
    });

    QUnit.test( "PS-121: Rectangles with x and y intersection", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec1 = new Rectangle(x_rec, y_rec, r_width, r_height);
        rec2 = new Rectangle(x_rec+r_width-5, y_rec-r_height+5, r_width, r_height);
        assert.deepEqual(rec1.intersects(rec2), true)
    });
    QUnit.test( "PS-122: Rectangles only with x intersection", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec1 = new Rectangle(x_rec, y_rec, r_width, r_height);
        rec2 = new Rectangle(x_rec+r_width-5, y_rec, r_width, r_height);
        assert.deepEqual(rec1.intersects(rec2), true)
    });
    QUnit.test( "PS-123: Rectangles only with y intersection", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec1 = new Rectangle(x_rec, y_rec, r_width, r_height);
        rec2 = new Rectangle(x_rec, y_rec-r_height+5, r_width, r_height);
        assert.deepEqual(rec1.intersects(rec2), true)
    });
    QUnit.test( "PS-124: Rectangles without intersection", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec1 = new Rectangle(x_rec, y_rec, r_width, r_height);
        rec2 = new Rectangle(x_rec+r_width+5, y_rec-r_height-5, r_width, r_height);
        assert.deepEqual(rec1.intersects(rec2), false)
    });

    QUnit.test( "PS-131: Rectangle movement all ok", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec = new Rectangle(x_rec, y_rec, r_width, r_height);
        rec.move(50,50);
        assert.deepEqual(rec.x, x_rec+50, "Passed");
        assert.deepEqual(rec.y, y_rec+50, "Passed");
    });
    QUnit.test( "PS-132: Rectangle movement x out of bounds", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec = new Rectangle(x_rec, y_rec, r_width, r_height);
        rec.move(1000,0);
        assert.deepEqual(rec.x, x_rec+1000, "Passed");
        rec.move(-2000, 0);
        assert.deepEqual(rec.x, x_rec+1000-2000, "Passed");
    });
    QUnit.test( "PS-133: Rectangle movement y out of bounds", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec = new Rectangle(x_rec, y_rec, r_width, r_height);
        rec.move(0,1000);
        assert.deepEqual(rec.y, grid_size*9, "Passed");
        rec.move(0,-2000);
        assert.deepEqual(rec.y, 0, "Passed");
    });
    QUnit.test( "PS-134: Rectangle movement x and y out of bounds", function( assert ) {
        x_rec = width/2;
        y_rec = 250;
        r_width = grid_size;
        r_height = grid_size;
        rec = new Rectangle(x_rec, y_rec, r_width, r_height);
        rec.move(1000,1000);
        assert.deepEqual(rec.x, x_rec + 1000, "Passed");
        assert.deepEqual(rec.y, grid_size*9, "Passed");
        rec.move(-2000, -2000);
        assert.deepEqual(rec.x, x_rec + 1000 - 2000, "Passed");
        assert.deepEqual(rec.y, 0, "Passed");
    });


// Row class test
    QUnit.module('MOD-200: Row class test');

    QUnit.test( "PS-211: Row constructor all ok", function( assert ) {
        row = new Row(2 * grid_size, 3, 1.3, 2 * grid_size, 200,  30, true);
        //X pos
        assert.deepEqual(row.x, 0, "Passed");
        // Y pos
        assert.deepEqual(row.y, 2*grid_size, "Passed");
        //Width
        assert.deepEqual(row.w, width, "Passed");
        // Height
        assert.deepEqual(row.h, grid_size, "Passed");
        // Number of obstacles
        assert.deepEqual(row.obstacles.length, 3, "Passed");
        // Inverted
        assert.deepEqual(row.inverted, true, "Passed");
        // Offset
        assert.deepEqual(row.obstacles[0].x, 30, "Passed");
        // Speed
        assert.deepEqual(row.speed, 1.3, "Passed");
        // Spacing
        real = row.obstacles[1].x - row.obstacles[0].x;
        assert.deepEqual(real, 200, "Passed");
    });
    QUnit.test( "PS-212: Row constructor with negative speed", function( assert ) {
        row = new Row(2 * grid_size, 3, -1.3, 2 * grid_size, 200,  30, true);
        assert.deepEqual(row.speed, -1.3, "Passed");
    });
    QUnit.test( "PS-213: Row constructor with negative spacing between obstacles", function( assert ) {
        row = new Row(2 * grid_size, 3, -1.3, 2 * grid_size, 200,  30, true);
        real = row.obstacles[1].x - row.obstacles[0].x;
        assert.deepEqual(real, 200, "Passed");
    });


    QUnit.test( "PS-231: Row hits with a collider", function( assert ) {
        row = new Row(2 * grid_size, 3, -1.3, grid_size, 120,  30, false);
        rec = new Rectangle(90, 2*grid_size, 50, 50);
        hit = row.hits(rec);
        assert.deepEqual(hit, null, "Passed");
    });
    QUnit.test( "PS-232: Row does not hit with a collider", function( assert ) {
        row = new Row(2 * grid_size, 3, -1.3, grid_size, 120,  30, false);
        rec = new Rectangle(40, 2*grid_size, 50, 50);
        hit = row.hits(rec);
        assert.deepEqual(hit, row.obstacles[0], "Passed");
        rec = new Rectangle(179, 2*grid_size, 50, 50);
        hit = row.hits(rec);
        assert.deepEqual(hit, row.obstacles[1], "Passed");
    });


// Obstacle class test
    QUnit.module('MOD-300: Obstacle class test');

    QUnit.test( "PS-311: Obstacle constructor all ok", function( assert ) {
        obs = new Obstacle(0, 3 * grid_size, 100, grid_size, 1.3);
        assert.deepEqual(obs.x, 0, "Passed");
        assert.deepEqual(obs.y, 3 * grid_size, "Passed");
        assert.deepEqual(obs.w, 100, "Passed");
        assert.deepEqual(obs.h, grid_size, "Passed");
        assert.deepEqual(obs.speed, 1.3, "Passed");
    });
    QUnit.test( "PS-312: Obstacle constructor with negative speed", function( assert ) {
        obs = new Obstacle(0, 3 * grid_size, 100, grid_size, -1.3);
        assert.deepEqual(obs.speed, -1.3, "Passed");
    });

    QUnit.test( "PS-321: Obstacle update out off screen", function( assert ) {
        obs = new Obstacle(549, 3 * grid_size, 100, grid_size, 2);
        obs.update();
        assert.deepEqual(obs.x, -150, "Passed");
        obs = new Obstacle(-149, 3 * grid_size, 100, grid_size, -2);
        obs.update();
        assert.deepEqual(obs.x, 550, "Passed");
    });
    QUnit.test( "PS-322: Obstacle update inside screen", function( assert ) {
        obs = new Obstacle(547, 3 * grid_size, 100, grid_size, 2);
        obs.update();
        assert.deepEqual(obs.x, 549, "Passed");
    });


// Platform class test
    QUnit.module('MOD-400: Platform class test');
    QUnit.test( "PS-311: Platform constructor all ok", function( assert ) {
        obs = new Platform(0, 3 * grid_size, 100, grid_size, 1.3);
        assert.deepEqual(obs.x, 0, "Passed");
        assert.deepEqual(obs.y, 3 * grid_size, "Passed");
        assert.deepEqual(obs.w, 100, "Passed");
        assert.deepEqual(obs.h, grid_size, "Passed");
        assert.deepEqual(obs.speed, 1.3, "Passed");
    });
    QUnit.test( "PS-312: Platform constructor with negative speed", function( assert ) {
        obs = new Platform(0, 3 * grid_size, 100, grid_size, -1.3);
        assert.deepEqual(obs.speed, -1.3, "Passed");
    });

    QUnit.test( "PS-321: Platform update out off screen", function( assert ) {
        obs = new Platform(549, 3 * grid_size, 100, grid_size, 2);
        obs.update();
        assert.deepEqual(obs.x, -150, "Passed");
        obs = new Platform(-149, 3 * grid_size, 100, grid_size, -2);
        obs.update();
        assert.deepEqual(obs.x, 550, "Passed");
    });
    QUnit.test( "PS-322: Platform update inside screen", function( assert ) {
        obs = new Platform(547, 3 * grid_size, 100, grid_size, 2);
        obs.update();
        assert.deepEqual(obs.x, 549, "Passed");
    });


// SafeArea class test
    QUnit.module('MOD-500: Sefearea class test');
    QUnit.test( "PS-311: Safearea constructor all ok", function( assert ) {
        obs = new SafeArea(0, 3 * grid_size, 100, grid_size, 1.3);
        assert.deepEqual(obs.x, 0, "Passed");
        assert.deepEqual(obs.y, 3 * grid_size, "Passed");
        assert.deepEqual(obs.w, 100, "Passed");
        assert.deepEqual(obs.h, grid_size, "Passed");
        assert.deepEqual(obs.speed, 1.3, "Passed");
    });
    QUnit.test( "PS-312: Safearea constructor with negative speed", function( assert ) {
        obs = new SafeArea(0, 3 * grid_size, 100, grid_size, -1.3);
        assert.deepEqual(obs.speed, -1.3, "Passed");
    });

    QUnit.test( "PS-321: Safearea update out off screen", function( assert ) {
        obs = new SafeArea(549, 3 * grid_size, 100, grid_size, 2);
        obs.update();
        assert.deepEqual(obs.x, -150, "Passed");
        obs = new SafeArea(-149, 3 * grid_size, 100, grid_size, -2);
        obs.update();
        assert.deepEqual(obs.x, 550, "Passed");
    });
    QUnit.test( "PS-322: Safearea update inside screen", function( assert ) {
        obs = new SafeArea(547, 3 * grid_size, 100, grid_size, 2);
        obs.update();
        assert.deepEqual(obs.x, 549, "Passed");
    });


// Frog class test
    QUnit.module('MOD-600: Frog class test');
    QUnit.test( "PS-611: Frog constructor", function( assert ) {
        x_frog = width/2;
        y_frog = 250;
        frog_size = grid_size;
        t_frog = new Frog(x_frog, y_frog, frog_size);
        assert.deepEqual(t_frog.x, x_frog, "Passed");
        assert.deepEqual(t_frog.y, y_frog, "Passed");
        assert.deepEqual(t_frog.w, frog_size, "Passed");
        assert.deepEqual(t_frog.h, frog_size, "Passed");
    });

    QUnit.test( "PS-621: Frog attach", function( assert ) {
        x_frog = width/2;
        y_frog = 3 * grid_size;
        frog_size = grid_size;
        t_frog = new Frog(x_frog, y_frog, frog_size);
        obs = new Obstacle(250, 3 * grid_size, 100, grid_size, -1.3);
        t_frog.attach(obs);
        assert.deepEqual(t_frog.sitting_on, obs,"Passed");
        assert.deepEqual(t_frog.sitting_on.speed, -1.3,"Passed");
    });

    QUnit.test( "PS-621: Frog update with NOT attach object", function( assert ) {
        x_frog = width/2;
        y_frog = 3 * grid_size;
        frog_size = grid_size;
        t_frog = new Frog(x_frog, y_frog, frog_size);
        t_frog.update();
        assert.deepEqual(t_frog.x, x_frog, "Passed");
    });

    QUnit.test( "PS-622: Frog update with attach object", function( assert ) {
        x_frog = width/2;
        y_frog = 3 * grid_size;
        frog_size = grid_size;
        t_frog = new Frog(x_frog, y_frog, frog_size);
        obs = new Obstacle(250, 3 * grid_size, 100, grid_size, 2);
        t_frog.attach(obs);
        t_frog.update();
        assert.deepEqual(t_frog.x, width/2 + 2, "Passed");
    });

    QUnit.test( "PS-622: Frog out of bounds update with attach object", function( assert ) {
        x_frog = width;
        y_frog = 3 * grid_size;
        frog_size = grid_size;
        t_frog = new Frog(x_frog, y_frog, frog_size);
        obs = new Obstacle(549, 3 * grid_size, 100, grid_size, 2);
        t_frog.attach(obs);
        t_frog.update();
        assert.deepEqual(t_frog.x, width-grid_size, "Passed");

        x_frog = 0;
        y_frog = 3 * grid_size;
        frog_size = grid_size;
        t_frog = new Frog(x_frog, y_frog, frog_size);
        obs = new Obstacle(-149, 3 * grid_size, 100, grid_size, -2);
        t_frog.attach(obs);
        t_frog.update();
        assert.deepEqual(t_frog.x, 0, "Passed");
    });


// Sketch class test
    QUnit.module('MOD-700: Sketch class test');

    QUnit.test( "PS-711: Reset Game", function( assert ) {
        assert.deepEqual(frog.x, width/2, "Passed");
        assert.deepEqual(frog.y, height - grid_size, "Passed");
        assert.deepEqual(frog.w, grid_size, "Passed");
        assert.deepEqual(frog.h, grid_size, "Passed");
    });

    QUnit.test( "PS-721: Setup", function( assert ) {
        setup();
        assert.deepEqual(width, 500, "Passed");
        assert.deepEqual(rows.length, 9, "Passed");
        assert.deepEqual(frog.x, width/2, "Passed");
        assert.deepEqual(frog.y, height - grid_size, "Passed");
        assert.deepEqual(frog.w, grid_size, "Passed");
        assert.deepEqual(frog.h, grid_size, "Passed");
    });

    QUnit.test( "PS-731: Draw with frog not eliminated", function( assert ) {
        frog.move(0, 0);
        assert.deepEqual(frog.y, height-grid_size, "Passed");
    });

    QUnit.test( "PS-732: Draw with frog eliminated", function( assert ) {
        frog.move(-width/2 + 90, -grid_size);
        draw();
        assert.deepEqual(frog.y, height-grid_size, "Passed");
    });

    onkeydown = test_keyPress;
}
