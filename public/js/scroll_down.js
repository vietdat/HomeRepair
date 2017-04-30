function autoScroll(autoScrId, time, numOfItem) {
            var aS = $("#" + autoScrId);
            var itemHeight = aS.children().first().height();
            //add children
            var child = aS.children().clone().slice(0, numOfItem);
            aS.append(child);

            //set height box
            aS.parent().css('height', (numOfItem * itemHeight).toString() + "px")
            console.log(itemHeight);
            var step = aS.height() - aS.parent().height();

            function loop() {
                aS.animate({
                    'margin-top': '-' + step + "px"
                }, (time / step) * (step + parseInt(aS.css("margin-top"))), "linear", function() {
                    aS.css("margin-top", "0px")
                    loop();
                })
            }
            aS.hover(function() {
                aS.stop(true)

            }, function() {
                loop();
            });
            loop();
        }
        $(document).ready(function() {
            autoScroll('sc1', 30000, 8);
            autoScroll('sc2', 35000, 5);
        })
