var file_path="rtmp://localhost:1935/myapp/"+$('#zhibouid').attr('data-uid');
console.log(file_path);
jwplayer("player_container").setup({
  sources: [
      {
          file: file_path
      }
  ],
  // image: "/images/bg.jpg",
  autostart: true,
  width: 1170,
  height: 700,
  primary: "flash"
});