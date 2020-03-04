$("document").ready(function (){

    // TODO: Le refaire sans JQuery
    // Permet d'utiliser l'accordeon
    $("#accordeon h4").on("click", function() {
        $("#accordeon p").slideUp();
        $(this).siblings("p").slideDown(400);
        $(this).children("i").toggleClass("fa-minus").toggleClass("fa-plus");
        $("#accordeon h4").children("i").toggleClass("fa-minus").toggleClass("fa-plus");
    });

    // Permet de changer la couleur de certains éléments et du fond
    $("#colorpicker input").on("change", function(){
        $("html").css("background-color", $(this).val());
        $(".fab, .fas, .far, .colorpicked").css("color", $(this).val());
        $(".smallline").css("background-color", $(this).val());
        $(".coloredbtn").css("border", "1px " + $(this).val() + " solid");

        // Inverser la couleur de la goutte par rapport à la couleur du fond
        let hexValue = invertColor($(this).val());
        $("#colorpicker i").css("color", hexValue);
    })

    // Permet de faire le tri dans la 'gallery'
    $("#gallerysort li").on("click", function(){
        $("#gallerysort li.colorpicked").removeClass("colorpicked");
        $(this).addClass("colorpicked");
        $("#gallerysort li").css("color", "#000");
        $(this).css("color", $("#colorpicker input").val());
        
        let className = "gallery-" + $(this).html().toLowerCase();
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

    $("#gallerysection *.gallery-image").on("click", function(){
        let image = $(this).find("img").attr("src");
        console.log(image);
        $(".modal-image").css("background-image", "url(\"./" + image + "\")");
        $("#modal").css("display", "flex");
    });

    $("#modal span").on("click", function(){
        $("#modal").css("display", "none");
    })
});

const invertColor = (col) => {
    const colors = ['0', '1', '2', '3', '4', '5', '6', '7',
                    '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let inverseColor = '#';
    col.replace('#','').split('').forEach(i => {
      const index = colors.indexOf(i);
      inverseColor += colors.reverse()[index];
    });
    return inverseColor;
}