$("document").ready(function (){

    // Permet d'utiliser l'accordeon
    $("#accordeon h4").on("click", function(){
        $("#accordeon > div > p").addClass("accordeon-hide");
        $("#accordeon .fa-minus").removeClass("fa-minus").addClass("fa-plus");
        
        $(this).siblings("p").removeClass("accordeon-hide");
        $(this).find("i").addClass("fa-minus").removeClass("fa-plus");
    });
    
    // Permet de changer la couleur de certains éléments et du fond
    $("#colorpicker input").on("change", function(){
        $("html").css("background-color", $(this).val());
        $(".fab, .fas, .far, .colorpicked").css("color", $(this).val());
        $(".smallline").css("background-color", $(this).val());
        $(".coloredbtn").css("border", "1px " + $(this).val() + " solid");

        // Inverser la couleur de la goutte et du button burger par rapport à la couleur du fond
        let hexValue = invertColor($(this).val());
        $("#colorpicker i, #burgerbtn i").css("color", hexValue);
    })

    // Permet de faire le tri dans la 'gallery'
    $("#gallerysort li").on("click", function(){
        $("#gallerysort li.colorpicked").removeClass("colorpicked");
        $(this).addClass("colorpicked");
        $("#gallerysort li").css("color", "#000");
        $(this).css("color", $("#colorpicker input").val());
        
        let className = "gallery-" + $(this).text().toLowerCase();
        if (className == "gallery-all")
            $("#gallerysection figure > div").css("display", "block");
        else
            $("#gallerysection figure > div").each(function(){
                if (!$(this).hasClass(className))
                    $(this).css("display", "none");
                else
                    $(this).css("display", "block");
            })
    });

    // Permet d'ajouter les logos d'images, de musiques et de vidéos sur les
    // éléments de la 'gallery'
    $("#gallerysection *.gallery-video").append("<i class=\"fas fa-film\"></i>");
    $("#gallerysection *.gallery-audio").append("<i class=\"fas fa-music\"></i>");

    // Affichage de l'image modal de la gallery, ainsi que l'image du header
    $("#gallerysection *.gallery-image, header img").on("click", openModal);

    // Ajouter d'une ligne d'image pour le bouton 'Load more' de la gallery
    $("#loadmore").on("click", function(){
        let figure = $("#gallerysection > figure");
        // S'il n'y a pas encore de nouvelle ligne ajoutée, on en ajoute une
        // TODO: Voir combien de fois on peut ajouter
        if (figure.children().length == 8)
        {
            for (let i = 0; i < 4; i++){
                let imgCopy = $(figure.children()[0]).clone();
                $(imgCopy).find("img").attr("src", "img/figure/" + (9 + i) + ".jpg");
                $(imgCopy).on("click", openModal);
                figure.append(imgCopy);
            }
        }
    });

    // Fermeture de l'image modal
    $("#modal").on("click", closeModal);

    // Afficher le menu burger
    $("#burgerbtn").on("click", function(){
        $("header").toggleClass("headerclass-collapsed");
        $("header").toggleClass("headerclass-extended");
        if ($("header").hasClass("headerclass-extended"))
            $("nav a").css("display", "block");
        else
            $("nav a").css("display", "none");
    });

    // Permet de s'occuper du menu burger lors du passage au media queries
    let oldScreenWidth = window.innerWidth;
    $(window).on("resize", function(){
        if (window.innerWidth > 640 && oldScreenWidth <= 640){
            $("nav a").css("display", "inline");
            $("header").removeClass("headerclass-extended");
            $("header").addClass("headerclass-collapsed");
        }
        else if (window.innerWidth <= 640 && oldScreenWidth > 640)
            $("nav a").css("display", "none");
        oldScreenWidth = window.innerWidth;
    });

    // Permet de faire un parallax dynamique
    $(window).on("scroll", function(){ 
        let offset = $("#parallaxsection").position().top - screen.height;
        $("#parallaxsection").css("background-position", "50% " + offset / $(window).scrollTop() * 100 + "%");
    });

    // Permet au class 'arrow-moveup' de faire remonter la page tout en haut
    $(".arrow-moveup").on("click", function(){
        window.scrollTo(0, 0);
    })

    // Fonction pour inverser la couleur HEX
    function invertColor(col){
        if (col == "#808080")
            return "#999999";
        const colors = ['0', '1', '2', '3', '4', '5', '6', '7',
                        '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        let inverseColor = '#';
        col.replace('#','').split('').forEach(i => {
          const index = colors.indexOf(i);
          inverseColor += colors.reverse()[index];
        });
        return inverseColor;
    }

    console.log(oppositeColor("#aaa10a"));
    function oppositeColor(color){

        String.prototype.replaceAt = function(index, replacement) {
            return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        }
        return color.replaceAt(3, "paze");
        return color.replace("01", "98");
        function getOneOpposite(letter){
            switch (letter) {
                case "0":
                    return "9";
                case "1":
                    return "a";
                case "2":
                    return "b";
                case "3":
                    return "c";
                case "4":
                    return "d";
                case "5":
                    return "e";
                case "6":
                    return "f";
                case "7":
                    return "0";
                case "8":
                    return "1";
                case "9":
                    return "2";
                case "a":
                    return "3";
                case "b":
                    return "4";
                case "c":
                    return "5";
                case "d":
                    return "6";
                case "e":
                    return "7";
                case "f":
                    return "8";
            }
        }
    }

    function openModal(){
        let image = this == $("header img")[0] ? $(this).attr("src") : $(this).find("img").attr("src");
        $(".modal-image").css("background-image", "url(\"./" + image + "\")");
        $("#modal").css("display", "flex");
    }

    function closeModal(){
        $("#modal").css("display", "none");
    }

    // TODO: A suppr, pour Jérémie.
    /*
    let a = document.getElementsByTagName("header");
    for(let i = 0; i < a.length; i++)
        a[i].style["background"] = "red"
    */
});