
    if (Meteor.users.find().count() === 0){

      var now = new Date().getTime();
      var putraId = Accounts.createUser({
        username: 'f55113023',
        password: 'qwerty',
        profile: {
          nama: 'putra dinda',
          status: 'mahasiswa',
          foto: '/images/default.png'
        }
        
      });

      var putra = Meteor.users.findOne(putraId);

      var dindaId = Accounts.createUser({

        username: 'f55113024',
        password: 'qwerty',
        profile: {
          nama: 'dinda putra',
          status: 'mahasiswa',
          foto: '/images/default.png'
        }
      });

      var dinda = Meteor.users.findOne(dindaId);
      

      var subhanId = Accounts.createUser({
        username: 'f55113025',
        password: 'qwerty',
        profile: {
          nama: 'subhan dinda',
          status: 'mahasiswa',
          foto: '/images/default.png'
        }
      });

      var subhan = Meteor.users.findOne(subhanId);


      var dosenId = Accounts.createUser({
        username: '12345',
        password: 'qwerty',
        profile: {
          nama: 'abd ganteng',
          status: 'dosen',
          foto: '/images/default.png'
        }
      });

      var dosen = Meteor.users.findOne(dosenId);


      var dosen2Id = Accounts.createUser({
        username: '123456',
        password: 'qwerty',
        profile: {
          nama: 'abd tampan',
          status: 'dosen',
          foto: '/images/default.png'
        }
      });

      var dosen2 = Meteor.users.findOne(dosen2Id);




        var noteId = coll_notes.insert({
          isiNote: 'Lorem ipsum dolor sit amet, tempora ducimus voluptate ea, non dolores voluptatibus quae vitae excepturi',
          links: [{
            gambar: '/images/default.png',
            nama: 'gambar pertama',
            url: 'www.gambar.com'
          }]
        });
        

        var assigmentId = coll_assigments.insert({
          title: 'tugas pertama',
          deskripsi: 'ini tugas pertama untuk menunjang nilai',
          dueDate: new Date(now + 48 * 3600 * 1000),
          attachs: [
            {namaFile: 'file pertama', tipeFile: 'TXT', lokasi: '/file/ini', download: '/link/googlw.com'},
             {namaFile: 'file kedua', tipeFile: 'WORD', lokasi: '/file/ini', download: '/link/googlw.com'}
          ],
          submit: [
            {
              _id: dindaId,
              username: dinda.username,
              nama: dinda.profile.nama,
              foto: dinda.profile.foto,
              data: [
                {
                  judul: 'ini judul submit saya'
                }
              ]
            }
          ],
          links: [
            {
              gambar: '/images/default.png',
              nama: 'gambar pertama',
              url: 'www.gambar.com'
            }
          ]
        });



        var pollId = coll_polls.insert({
          pertanyaan: 'dosen terbaik menurut mahasiswa',
          pilihan: [
            {
              jawaban: "subhan dinda putra",
              vote: 2
            },
            {
              jawaban: "putri anughrah",
              vote: 1
            }
          ],

          semuaVote: [dindaId, putraId, subhanId]
        });


      var postNoteId =  coll_posts.insert({
          post: {
            _id: noteId,
            type: 'note'
          },
          owner: {
            _id: dindaId,
            username: dinda.username,
            nama: dinda.profile.nama,
            gambar: dinda.profile.foto,
            users: 'mahasiswa'
          },
          to: [

                {
                  _id: dosenId,
                  jenis: 'user'
                }
          ],

          comments: [

            {
              _id: putraId,
              submit: new Date(now - 24 * 3600 * 1000),
              body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate a dolorum eveniet laboriosam similique repudiandae!'
            }

          ],

          commentsCount: 1

        });

     var postAssigId = coll_posts.insert({
        
          post: {
            _id: assigmentId,
            type: 'assigment'
          },

          owner: {
            _id: dosenId,
            nama: dosen.profile.nama,
            gambar: dosen.profile.foto,
            users: 'dosen'
          },

          to: [ 
                {
                  _id: putraId ,
                  jenis: 'user'
                },
                {
                  _id: dindaId,
                  jenis: 'user'
                }
          ],

          comments: [

            {
              _id: dindaId,
              submit: new Date(now - 5 * 3600 * 1000),
              body: 'animi sunt velit quod voluptatibus dolor debitis nesciunt porro. Aliquid consectetur nesciunt aperiam sequi recusandae.'
            },

            {
              _id: putraId,
              submit: new Date(now - 24 * 3600 * 1000),
              body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate a dolorum eveniet laboriosam similique repudiandae!'
            }

          ],

          commentsCount: 2

        });


       var postPollId = coll_posts.insert({
        
          post: {
            _id: pollId,
            type: 'poll'
          },
          owner: {
            _id: dosenId,
            nama: dosen.profile.nama,
            gambar: dosen.profile.foto,
            users: 'dosen'
          },
          to: [
                {
                  _id: putraId ,
                  jenis: 'user'
                },
                {
                  _id: dindaId,
                  jenis: 'user'
                },
                {
                  _id: dosen2Id,
                  jenis: 'user'
                }
          ]

        });


        coll_groups.insert({
          nama: 'kompetisi',
          warna: randomColor(),
          kategoriGroup: 'umum',
          deskripsiGroup: 'group untuk mahasisiwa tim olimpiade',
          owner: {
              _id: dosenId,
              nama: dosen.profile.nama,
              foto: dosen.profile.foto
          },
          anggota: [
            {
              _id: putraId,
              nama: putra.profile.nama,
              status: putra.profile.status,
              foto: putra.profile.foto,
              username: putra.username
            },
            {
              _id: dindaId,
              nama: dinda.profile.nama,
              status: dinda.profile.status,
              foto: dinda.profile.foto,
              username: dinda.username
            }
          ],

          smallGroup: [
            {
                nama: 'pemrograman',
                deskripsi: 'untuk kepentingan kompetisi pemrograman',
                anggota: [putraId,dindaId]
            },
            {
                nama: 'grafis',
                deskripsi: 'untuk kepentingan kompetisi grafis'
            }
          ]
        });

        coll_groups.insert({
          nama: 'framework',
          warna: randomColor(),
          kategoriGroup: 'semester 1',
          deskripsiGroup: 'group untuk mahasisiwa framework',
          owner: {
              _id: dosenId,
              nama: dosen.profile.nama,
              foto: dosen.profile.foto
          },
          anggota: [
            {
              _id: subhanId,
              nama: subhan.profile.nama,
              status: subhan.profile.status,
              foto: subhan.profile.foto,
              username: subhan.username
            },
            {
              _id: dosen2Id,
              nama: dosen2.profile.nama,
              status: dosen2.profile.status,
              foto: dosen2.profile.foto,
              username: dosen2.username
            }
          ]

        });


        coll_groups.insert({
          nama: 'telas',
          warna: randomColor(),
          kategoriGroup: 'semester 9',
          deskripsiGroup: 'group untuk mahasisiwa framework',
          owner: {
              _id: dosen2Id,
              nama: dosen2.profile.nama,
              foto: dosen2.profile.foto
          },
          anggota: [
            {
              _id: dosenId,
              nama: dosen.profile.nama,
              status: dosen.profile.status,
              foto: dosen.profile.foto,
              username: dosen.username
            }
          ]

        });

    }



  // coll_notes.update(
  //   {_id:'KB2fSrK5GjoLTwsZp'},
  //   {
  //     $push: {
  //       links: { $each: [{gambar: 'ini', nama: 'namanya', url: 'urlnya'}] } 
  //     }
  //   }
  // )

  // coll_notes.update(
  //   {_id:'KB2fSrK5GjoLTwsZp'},
  //   {
  //     $push: {
  //       attachs: { $each: [{namaFile: 'file pertama', tipeFile: 'TXT', lokasi: '/file/ini', download: '/link/googlw.com'}] } 
  //     }
  //   }
  // )