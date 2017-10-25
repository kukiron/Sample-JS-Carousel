const img = document.getElementsByTagName("img");

const url = "http://localhost:3000/data";

fetch(url)
  .then(response => response.json())
  .then(data => {
    img[0].src = data[0].images[Math.floor(data[0].images.length * Math.random())];

    $(function() {
      let slide_index = 0;
      const ul = $(".slider ul"),
        slide_count = ul.children().length,
        slide_width_pc = 100.0 / slide_count;

      ul.find("li").each(function(index) {
        var left_percent = slide_width_pc * index + "%";
        $(this).css({ left: left_percent });
        $(this).css({ width: 100 / slide_count + "%" });
      });

      // Listen for click of prev button
      $(".slider .prev").click(function() {
        $(".next").prop("disabled", false);
        let num = slide_index === 0 ? slide_index : slide_index - 1,
          randomNum = Math.floor(data[num].images.length * Math.random());
        img[num].src = data[num].images[randomNum];
        slide(num);

        if (num === 0) {
          $(".prev").prop("disabled", true);
        }
      });

      // Listen for click of next button
      $(".slider .next").click(function() {
        $(".prev").prop("disabled", false);
        let num = slide_index < img.length - 1 ? slide_index + 1 : slide_index,
          randomNum = Math.floor(data[num].images.length * Math.random());
        img[num].src = data[num].images[randomNum];
        slide(num);

        if (num === img.length - 1) {
          $(".next").prop("disabled", true);
        }
      });

      function slide(new_slide_index) {
        if (new_slide_index < 0 || new_slide_index >= slide_count) return;
        const margin_left_pc = new_slide_index * -100 + "%";
        ul.animate({ "margin-left": margin_left_pc }, 1000, function() {
          slide_index = new_slide_index;
        });
      }
    });
  });
