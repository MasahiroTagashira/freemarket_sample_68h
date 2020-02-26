$(function(){

  const buildFileField = (num)=> {
    const html = `<div data-index="${num}" class="js-file_group">
                    <input class="js-file" type="file"
                    name="product[images_attributes][${num}][image]"
                    id="product_images_attributes_${num}_image">
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;

  }
  
  const buildImg = (index, url)=> {
    const html = `<div data-index="${index}" class="preview">
                    <img data-index="${index}" src="${url}" width="117px" height="117px">
                    <div class="preview__menu">
                      <div class="js-edit">編集</div>
                      <div class="js-remove">削除</div>
                    </div>
                  </div>`;
    return html;
  }

  let fileIndex = [1,2,3,4,5,6,7,8,9,10];

  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  $('.hidden-destroy').hide();

  $('#image-box').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('image', blobUrl);
    } else if ($('.js-file').length == 10) {
      $('#previews').append(buildImg(targetIndex, blobUrl));
    }
    else{
      $('#previews').append(buildImg(targetIndex, blobUrl));
      $('#image-box').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
    }
  });

  $('#image-box').on('click', '.js-remove', function() {
    const targetIndex = $(this).parents('.preview').data('index');   //削除ボタンが押された js-file_groupのindexを取得している
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    var div1 = $(this).parent();
    var targetPreview = $(this).parent().parent();
    var div3 = $(this).parent().parent().parent();
    var div4 = $(div3).children();

    console.log(targetIndex);
    console.log(div1);
    console.log(targetPreview);
    console.log(div3);
    console.log(div4);

    if (hiddenCheck) hiddenCheck.prop('checked', true);

    // $(this).parents('.preview').remove();
    $(`.preview[data-index="${targetIndex}"]`).remove;
    $($(this).parents('.contents__image__box__container').children(`.js-file_group[data-index="${targetIndex}"]`)).remove;
    
    $(`img[data-index="${targetIndex}"]`).remove();

  
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
});

// $(document).on('turbolinks:load', ()=> {
//   const buildFileField = (index)=> {
//     const html = `<div data-index="${index}" class="js-file_group">
//                     <input label class="js-file" type="file"
//                     name="product[images_attributes][${index}][image]"
//                     id="product_images_attributes_${index}_src"><br>
//                   </div>`;
//     return html;
//   }

//   const buildImg = (index, url)=> {
//     const html = `<div data-index="${index}" class="contents__image__box__area__preview__box">
//                     <img data-index="${index}" src="${url}", class: "contents__image__box__area__preview__box__thumb", width="110px" height="110px">
//                     <div class="js-remove">削除</div>
//                   </div>`
//     return html;
//   }

//   let fileIndex = [1,2,3,4,5,6,7,8,9,10];
//   lastIndex = $('.js-file_group:last').data('index');
//   fileIndex.splice(0, lastIndex);
  

//   $('.hidden-destroy').hide();

//   $('.contents__image__box__area').on('change', '.js-file', function(e) {
//     const targetIndex = $(this).parent().data('index');
//     const file = e.target.files[0];
//     const blobUrl = window.URL.createObjectURL(file);
//     if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
//       img.setAttribute('src', blobUrl);
//     } else {
//       $('.contents__image__box__area__preview').append(buildImg(targetIndex, blobUrl));
//       $('.contents__image__box__area').append(buildFileField(fileIndex[0]));
//       fileIndex.shift();
//       fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
//     }
//   });

//   $('.contents__image__box__area__preview').on('click', '.js-remove', function() {
//     const targetIndex = $(this).parent().data('index')
//     const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
//     if (hiddenCheck) hiddenCheck.prop('checked', true);
//     $(this).parent().remove();
//     $(`.js-file_group[data-index="${targetIndex}"`).remove();
//     $(`img[data-index="${targetIndex}"]`).remove();
//     if ($('.js-file').length == 0) $('.contents__image__box__area').append(buildFileField(fileIndex[0]));
//   });
// });