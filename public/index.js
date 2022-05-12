(function () {

let amis = amisRequire('amis/embed');
const match = amisRequire('path-to-regexp').match;
const history = History.createHashHistory();

const app = {
  type: "app",
  brandName: "Disney Plus",
  pages: [
    {
      url: "/",
      redirect: "index"
    },
    {
      children: [
        {
          label: "index",
          url: "index",
          visible: false,
          schema: {
            type: "panel",
            title: "shows",
            body: [
              {
    
                "type": "carousel",
                "controlsTheme": "light",
                "height": "300",
                "options": [
                  {
                    "image": "/images/Disney-logo.jpg"
                  },
                  {
                    "image": "/images/Luke.jpg"
                  },
                  {
                    "image": "/images/winnie.jpg"
                  }              
                ]
              },
              {
                "type": "html",
                "html": "<h1 align='center'>Welcome to Disney+</h1> <br> <h2 align='center'>This is a GUI demo for CSC3170 project</h2>"
              }
            ]
          }
          

          
          
        },
        {
          url: "login",
          visible: false,
          schema: {
            type: "form",
            title: "login",
            api: "post:/api/login",
            onFinished: ret => {
              localStorage.setItem("token", ret.token)
            },
            body: [
              {
                type: "input-text",
                name: "name",
                label: "Name",
                required: true
              },
              {
                type: "input-password",
                name: "password",
                label: "Password",
                required: true
              }
            ],
            actions: [
              {
                label: "No account? Register!",
                type: "button",
                level: "link",
                onClick: () => {
                  history.push('/register')
                }
              },
              {
                type: "submit",
                label: "login"
              }
            ]
          }
        },
        {
          url: "register",
          visible: false,
          schema: {
            type: "form",
            title: "register",
            api: "post:/api/register",
            onFinished: () => {
              history.push('/login')
            },
            body: [
              {
                type: "input-text",
                name: "name",
                label: "Name",
                required: true
              },
              {
                type: "input-password",
                name: "password",
                label: "Password",
                required: true
              }
            ],
            actions: [
              {
                label: "Have an account? Login!",
                type: "button",
                level: "link",
                onClick: () => {
                  history.push('/login')
                }
              },
              {
                type: "submit",
                label: "register"
              }
            ]
          }
        },
        {
          label: "show",
          url: "show",
          schema: {
            type: "page",
            title: "shows",
            body: {
              type: "crud",
              api: "get:/api/show/list",
              
              "itemAction": {
                type: "button",
                actionType: "link",
                url: "/show/${SHOW_ID}"
              },
              "columnsTogglable": false,
              "columns": [
                {
                  "name": "SHOW_ID",
                  "label": "SHOW_ID",
                  //"width": 20,
                  "type": "text"
                  
                },
                {
                  "name": "SHOW_TITLE",
                  "label": "SHOW_TITLE",
                  "type": "text",
                  //"width": 80,
                },
                {
                  "name": "SHOW_RATING",
                  "label": "SHOW_RATING",
                  "type": "text",
                  //"width": 20
                },
                {
                  "name": "SHOW_AVG_SCORE",
                  "label": "SHOW_AVG_SCORE",
                  "type": "text",
                  //"width": 20
                },
                {
                  "name": "SHOW_DURATION",
                  "label": "SHOW_DURATION",
                  "type": "text"
                }
              ]

              // syncLocation: false,
              // mode: "cards",
              // placeholder: "no movie",
              // card: {
              //   className: "flex items-center",
              //   header: {
              //     avatar: "${cover_url}",
              //   },
              //   body: "名称：${name}",
              //   itemAction: {
              //     type: "button",
              //     actionType: "link",
              //     url: "/movie/${id}"
              //   }
              // }
            }
          }
        },
        {
          label: "showID",
          url: "show/:id",
          visible: false,
          schema: {
            type: "page",
            body: {
              type: "service",
              api: "get:/api/show/${params.id}",
              body: [
                {
                  type: "wrapper",
                  className: "flex flex-row justify-between items-center",
                  body: [
                    {
                      type: "wrapper",
                      className: "flex flex-row justify-between items-center",
                      body: [
                        {
                          type: "image",
                          //src: "${cover_url}",
                          src: "images/movie${params.id%8+1}.jpg",
                          thumbMode: "cover",
                          enlargeAble: true
                        },
                        {
                          type: "html",
                          className: "ml-8",
                          html: "<h1>${SHOW_TITLE}</h1>"
                        },
                      ]
                    },
                    // {
                    //   label: "add comment",
                    //   type: "button",
                    //   actionType: "dialog",
                    //   dialog: {
                    //     title: "add comment",
                    //     body: {
                    //       type: "form",
                    //       api: "post:/api/comment/add-to-movie/${params.id}",
                    //       onFinished: () => {
                    //         window.location.reload()
                    //       },
                    //       body: [
                    //         {
                    //           type: "input-rating",
                    //           name: "rate",
                    //           label: "Rate",
                    //           count: 5,
                    //           required: true
                    //         },
                    //         {
                    //           type: "input-text",
                    //           name: "content",
                    //           label: "Comment",
                    //           required: true
                    //         }
                    //       ]
                    //     }
                    //   }
                    // },
                  ]
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Description</h2>"
                },
                {
                  type: "wrapper",
                  body: "${SHOW_DESCRIPTION}"
                },
                {
                  type: "wrapper",
                  visibleOn: "${SHOW_AVG_SCORE != null}",
                  body: "Average Score: ${SHOW_AVG_SCORE}"
                },
                {
                  type: "cards",
                  source: "${genres}",
                  card: {
                    itemAction: {
                      type: "button",
                      actionType: "link",
                      
                      url: "/genre/${GENRE_ID}"
                    },                  
                    "body": [
                      {
                        className: "flex flex-col items-center",
                        "label": "GENRE_NAME",
                        "name": "${GENRE_NAME}"
                      }
                    ]
                  }
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Director</h2>"
                },
                {
                  type: "cards",
                  source: "${directors}",
                  card: {
                    header: {
                      className: "flex flex-col items-center",
                      avatar: "images/director${DIR_ID%6+1}.jpg",
                      title: "${DIR_FNAME} ${DIR_MNAME} ${DIR_LNAME}"
                      //subTitle: "act ${character_name}"
                    },
                    itemAction: {
                      type: "button",
                      actionType: "link",
                      
                      url: "/director/${DIR_ID}"
                    },
                    "body": [
                      {
                        "label": "info",
                        "name": "${DIR_DESCRIPTION}"
                      },
                      {
                        "label": "gender",
                        "name": "${DIR_GENDER}"
                      }
                    ]
                  }
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Actors</h2>"
                },
                {
                  type: "cards",
                  source: "${actors}",
                  card: {
                    header: {
                      className: "flex flex-col items-center",
                      avatar: "images/actor${ACTOR_ID%5+1}.jpg",
                      title: "${ACTOR_FNAME} ${ACTOR_MNAME} ${ACTOR_LNAME}"
                      //subTitle: "act ${character_name}"
                    },
                    itemAction: {
                      type: "button",
                      actionType: "link",
                      
                      url: "/actor/${ACTOR_ID}"
                    },
                    "body": [
                      {
                        "label": "info",
                        "name": "${ACTOR_DESCRIPTION}"
                      },
                      {
                        "label": "gender",
                        "name": "${ACTOR_GENDER}"
                      }
                    ]
                  }
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Comments</h2>"
                },
                {
                  type: "each",
                  source: "${comments}",
                  items: {
                    type: "panel",
                    title: {
                      type: "wrapper",
                      className: "flex justify-between items-center",
                      body: [
                        {
                          type: "image",
                          src: "/images/user${USER_ID%5+1}.jpg",
                        },
                        {
                          type: "wrapper",
                          body: "${USER_NAME}"
                        },
                        {
                          type: "wrapper",
                          body: "Rate: ${SCORE}"
                        },
                        {
                          type: "wrapper",
                          body: "${REVIEW_TIME}"
                        },
                        // {
                        //   type: "action",
                        //   label: "go to user homepage",
                        //   actionType: "link",
                        //   link: "/user/${id}"
                        // }
                      ]
                    },
                    body: [                 
                      {
                        type: "wrapper",
                        body: "${COMMENTS}"
                      }
                    ]
                  }
                }
              ]
            }
          }
        },
        {
          label: "director",
          url: "director",
          schema: {
            type: "page",
            title: "director",
            body: {
              type: "crud",
              api: "get:/api/director/list",
              
              "itemAction": {
                type: "button",
                actionType: "link",
                url: "/director/${DIR_ID}"
              },
              "columnsTogglable": false,
              "columns": [
                {
                  "name": "DIR_ID",
                  "label": "DIR_ID",
                  "width": 20,
                  "type": "text"
                  
                },
                {
                  "name": "DIR_FNAME",
                  "label": "DIR_FNAME",
                  "type": "text",
                  "width": 80,
                },
                {
                  "name": "DIR_MNAME",
                  "label": "DIR_MNAME",
                  "type": "text",
                  "width": 80,
                },
                {
                  "name": "DIR_LNAME",
                  "label": "DIR_LNAME",
                  "type": "text",
                  "width": 80,
                },
                {
                  "name": "DIR_GENDER",
                  "label": "DIR_GENDER",
                  "type": "text",
                  "width": 20
                },
                {
                  "name": "DIR_BIRTH",
                  "label": "DIR_BIRTH",
                  "type": "text"
                },
                {
                  "name": "DIR_DESCRIPTION",
                  "label": "DIR_DESCRIPTION",
                  "type": "text"
                }
              ]

              
            }
          }
        },
        {
          label: "directorID",
          url: "director/:id",
          visible: false,
          schema: {
            type: "page",
            title: "director",
            body: {
              type: "service",
              api: "get:/api/director/${params.id}",
              
              // "itemAction": {
              //   type: "button",
              //   actionType: "link",
              //   url: "/director/${DIR_ID}"
              // },
              body: [
                {
                  type: "image",
                  src: "/images/director${DIR_ID%6+1}.jpg",
                  thumbMode: "cover",
                  enlargeAble: true
                },
                {
                  type: "wrapper",
                  className: "text-2xl font-bold",
                  body: "${DIR_FNAME} ${DIR_MNAME} ${DIR_LNAME}"
                },
                {
                  type: "divider"
                },
                {
                  type: "wrapper",
                 
                  body: "<h2>gender:${DIR_GENDER}</h2>"
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Description</h2>"
                },
                {
                  type: "wrapper",
                 
                  body: "<h2>${DIR_DESCRIPTION}</h2>"
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Shows</h2>"
                },
                {
                  type: "cards",
                  source: "${movies}",
                  card: {
                    header: {
                      className: "flex flex-col items-center",
                      avatar: "images/movie${SHOW_ID%8+1}.jpg",
                      title: "${SHOW_TITLE}",
                      //subTitle: "act ${character_name}"
                    },
                    itemAction: {
                      type: "button",
                      actionType: "link",
                      url: "/show/${SHOW_ID}"
                    }
                  }
                }
                
              ]

              
            }
          }
        },
        {
          label: "actor",
          url: "actor",
          schema: {
            type: "page",
            title: "actors",
            body: {
              type: "crud",
              api: "get:/api/actor/list",
              syncLocation: false,
              mode: "cards",
              placeholder: "no actor",
              card: {
                className: "flex items-center",
                header: {
                  //avatar: "${photo_url}",
                  avatar: "images/actor${ACTOR_ID%5+1}.jpg"
                },
                body: [
                  "${ACTOR_FNAME} ${ACTOR_MNAME} ${ACTOR_LNAME}",
                  {
                    "label": "gender",
                    "name": "${ACTOR_GENDER}"
                  }
                ],
                itemAction: {
                  type: "button",
                  actionType: "link",
                  url: "/actor/${ACTOR_ID}"
                }
              }
            }
          }
        },
        {
          label: "actorID",
          url: "actor/:id",
          visible: false,
          schema: {
            type: "page",
            body: {
              type: "service",
              api: "get:/api/actor/${params.id}",
              body: [
                {
                  type: "wrapper",
                  className: "flex",
                  body: [
                    {
                      type: "image",
                      src: "images/actor${ACTOR_ID%5+1}.jpg",
                      thumbMode: "cover",
                      enlargeAble: true
                    },
                    {
                      type: "html",
                      className: "ml-8",
                      html: "<h1>${ACTOR_FNAME} ${ACTOR_MNAME} ${ACTOR_LNAME} <br><h3>${ACTOR_GENDER}    ${ACTOR_BIRTH}</h3></br></h1>"
                    }
                  ]
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Description</h2>"
                },
                {
                  type: "wrapper",
                  body: "${ACTOR_DESCRIPTION}"
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Shows</h2>"
                },
                {
                  type: "cards",
                  source: "${movies}",
                  card: {
                    header: {
                      className: "flex flex-col items-center",
                      avatar: "images/movie${SHOW_ID%8+1}.jpg",
                      title: "${SHOW_TITLE}",
                      //subTitle: "act ${character_name}"
                    },
                    itemAction: {
                      type: "button",
                      actionType: "link",
                      url: "/show/${SHOW_ID}"
                    }
                  }
                }
              ]
            }
          }
        },
        
        
        // {
        //   label: "history",
        //   url: "history",
        //   schema: {
        //     type: "page",
        //     title: "history",
        //     body: {
        //       type: "crud",
        //       api: "get:/api/history/list",
              
        //       "itemAction": {
        //         type: "button",
        //         actionType: "link",
        //         url: "/user/${USER_ID}"
        //       },
        //       "columnsTogglable": false,
        //       "columns": [
        //         {
        //           "name": "USER_ID",
        //           "label": "USER_ID",
        //           "width": 20,
        //           "type": "text"
                  
        //         },
        //         {
        //           "name": "USER_NAME",
        //           "label": "USER_NAME",
        //           "width": 20,
        //           "type": "text"
                  
        //         },
        //         {
        //           "name": "SHOW_ID",
        //           "label": "SHOW_ID",
        //           "type": "text",
        //           "width": 80,
        //         },
        //         {
        //           "name": "STAET_TIME",
        //           "label": "STAET_TIME",
        //           "type": "text",
        //           "width": 20
        //         },
        //         {
        //           "name": "END_TIME",
        //           "label": "END_TIME",
        //           "type": "text"
        //         },
        //         {
        //           "name": "WATCH_COUNT",
        //           "label": "WATCH_COUNT",
        //           "type": "text"
        //         },
        //         {
        //           "name": "END_POSITION",
        //           "label": "END_POSITION",
        //           "type": "text"
        //         }
        //       ]

              
        //     }
        //   }
        // },
        {
          label: "genre",
          url: "genre",
          schema: {
            type: "page",
            title: "genre",
            body: {
              type: "crud",
              api: "get:/api/genre/list",
              
              "itemAction": {
                type: "button",
                actionType: "link",
                url: "/genre/${GENRE_ID}"
              },
              "columnsTogglable": false,
              "columns": [
                {
                  "name": "GENRE_ID",
                  "label": "GENRE_ID",
                  "width": 20,
                  "type": "text"
                  
                },
                {
                  "name": "GENRE_NAME",
                  "label": "GENRE_NAME",
                  "type": "text",
                  "width": 80,
                }
              ]

              
            }
          }
        },
        {
          label: "genreID",
          url: "genre/:id",
          schema: {
            type: "page",
            title: "genre",
            body: {
              type: "service",
              api: "get:/api/genre/${params.id}",
              
              // "itemAction": {
              //   type: "button",
              //   actionType: "link",
              //   url: "/user/${USER_ID}"
              // },
              body:[

                {
                  type: "html",
                  html: "<h2>Shows of ${GENRE_NAME}</h2>"
                },
                {
                  type: "cards",
                  source: "${movies}",
                  card: {
                    header: {
                      className: "flex flex-col items-center",
                      avatar: "images/movie${SHOW_ID%8+1}.jpg",
                      title: "${SHOW_TITLE}",
                      //subTitle: "act ${character_name}"
                    },
                    itemAction: {
                      type: "button",
                      actionType: "link",
                      url: "/show/${SHOW_ID}"
                    }
                  }
                }
              ]

              
            }
          }
        },
        {
          label: "review",
          url: "review",
          schema: {
            type: "page",
            title: "review",
            body: {
              type: "service",
              api: "get:/api/review/list",
              body: {
                type: "each",
                source: "${items}",
                items: {
                  type: "panel",
                  title: {
                    type: "wrapper",
                    className: "flex justify-between items-center",
                    body: [
                      {
                        type: "wrapper",
                        className: "flex flex-col items-center",
                        body: [
                          {
                            type: "image",
                            src: "/images/user${USER_ID %5+1}.jpg"
                          },
                          {
                            type: "wrapper",
                            body: "${user_name}"
                          }
                        ]
                      },
                      {
                        type: "wrapper",
                        className: "flex flex-col items-center",
                        body: [
                          {
                            type: "image",
                            src: "/images/movie${SHOW_ID%8+1}.jpg"
                          },
                          {
                            type: "wrapper",
                            body: "${SHOW_TITLE}"
                          }
                        ]
                      },
                      {
                        type: "wrapper",
                        body: "${REVIEW_TIME}"
                      },
                      {
                        type: "wrapper",
                        body: "Rate: ${SCORE}"
                      },
                      {
                        type: "wrapper",
                        body: "Comment: ${COMMENTS}"
                      },
                      {
                        type: "wrapper",
                        className: "flex flex-col items-center",
                        body: [
                          {
                            type: "action",
                            label: "go to user homepage",
                            actionType: "link",
                            link: "/user/${USER_ID}"
                          },
                          {
                            type: "action",
                            label: "go to movie detail page",
                            actionType: "link",
                            link: "/show/${SHOW_ID}"
                          }
                        ]
                      }
                    ]
                  },
                  // body: [
                  //   {
                  //     type: "wrapper",
                  //     body: "Rate: ${SCORE}"
                  //   },
                  //   {
                  //     type: "wrapper",
                  //     body: "Comment: ${COMMENTS}"
                  //   }
                  // ]
                }
              }
            }
          }
        },
        {
          label: "users",
          url: "users",
          schema: {
            type: "page",
            title: "users",
            body: {
              type: "crud",
              api: "get:/api/user/",
              
              "itemAction": {
                type: "button",
                actionType: "link",
                url: "/user/${USER_ID}"
              },
              "columnsTogglable": false,
              "columns": [
                {
                  "name": "USER_ID",
                  "label": "USER_ID",
                  //"width": 20,
                  "type": "text"
                  
                },
                {
                  "name": "USER_NAME",
                  "label": "USER_NAME",
                  "type": "text",
                  //"width": 20,
                },
                {
                  "name": "USER_EMAIL",
                  "label": "USER_EMAIL",
                  "type": "text",
                  //"width": 40,
                },
                {
                  "name": "USER_RANK",
                  "label": "USER_RANK",
                  "type": "text",
                }
              ]

              
            }
          }
        },
        
        {
          label: "userID",
          url: "user/:id",
          visible: false,
          schema: {
            type: "page",
            body: {
              type: "service",
              api: "get:/api/user/info/${params.id}",
              body: [
                {
                  type: "image",
                  src: "/images/user${USER_ID%5+1}.jpg",
                  thumbMode: "cover",
                  enlargeAble: true
                },
                {
                  type: "wrapper",
                  className: "text-2xl font-bold",
                  body: "${USER_NAME}"
                },
                {
                  type: "divider"
                },
                {
                  type: "wrapper",
                  visibleOn: "${USER_PRIVACY == 'FALSE'||USER_PRIVACY == 'false'}",//!!!!!!!!!!!!!!!!!privacy
                  body: "<h2>You are not allowed to view the user information because it is private</h2>"
                },
                {
                  type: "wrapper",
                  visibleOn: "${USER_PRIVACY == 'TRUE'}",//!!!!!!!!!!!!!!!!!privacy
                  body: "<h2>gender:${USER_GENDER}</h2>"
                },
                {
                  type: "divider"
                },
                {
                  type: "html",
                  html: "<h2>Comments</h2>"
                },
                {
                  "type": "radios",
                  "name": "foo",
                  "label": false,
                  "value": 1,
                  "options": [
                    {
                      "label": "show",
                      "value": 1
                    },
                    {
                      "label": "hide",
                      "value": 2
                    }
                  ]
                },
                {
                  type: "each",
                  source: "${comments}",
                  visibleOn: "${foo == 1 && USER_PRIVACY == 'TRUE'}",
                  items: {
                    type: "panel",
                    title: {
                      type: "wrapper",
                      className: "flex justify-between items-center",
                      body: [
                        {
                          type: "image",
                          src: "/images/movie${SHOW_ID%8+1}.jpg",
                        },
                        {
                          type: "wrapper",
                          body: "${SHOW_TITLE}"
                        },
                        {
                          type: "wrapper",
                          body: "${REVIEW_TIME}"
                        },
                        {
                          type: "action",
                          label: "go to movie detail page",
                          actionType: "link",
                          link: "/show/${SHOW_ID}"
                        }
                      ]
                    },
                    body: [
                      {
                        type: "wrapper",
                        body: "Rate: ${SCORE}"
                      },
                      {
                        type: "wrapper",
                        body: "Comment: ${COMMENTS}"
                      }
                    ]
                  }
                },
                {
                  type: "html",
                  html: "<h2>History</h2>"
                },
                {
                  "type": "radios",
                  "name": "fooo",
                  "label": false,
                  "value": 1,
                  "options": [
                    {
                      "label": "show",
                      "value": 1
                    },
                    {
                      "label": "hide",
                      "value": 2
                    }
                  ]
                },
                {
                  type: "each",
                  source: "${histories}",
                  visibleOn: "${fooo == 1 && USER_PRIVACY == 'TRUE'}",
                  items: {
                    type: "panel",
                    title: {
                      type: "wrapper",
                      className: "flex justify-between items-center",
                      body: [
                        {
                          type: "image",
                          src: "/images/movie${SHOW_ID%8+1}.jpg",
                        },
                        {
                          type: "wrapper",
                          body: "SHOW_TITLE:${SHOW_TITLE}"
                        },
                        {
                          type: "action",
                          label: "go to movie detail page",
                          actionType: "link",
                          link: "/show/${SHOW_ID}"
                        }
                      ]
                    },
                    body: [
                      
                      {
                        type: "wrapper",
                        body: "START_TIME:${START_TIME}"
                      },
                      {
                        type: "wrapper",
                        body: "END_TIME:${END_TIME}"
                      },
                      {
                        type: "wrapper",
                        body: "WATCH_COUNT: ${WATCH_COUNT}"
                      },
                      {
                        type: "wrapper",
                        body: "END_POSITION: ${END_POSITION}"
                      }
                    ]
                  }
                },
                {
                  type: "html",
                  html: "<h2>favorites</h2>"
                },
                {
                  "type": "radios",
                  "name": "foooo",
                  "label": false,
                  "value": 1,
                  "options": [
                    {
                      "label": "show",
                      "value": 1
                    },
                    {
                      "label": "hide",
                      "value": 2
                    }
                  ]
                },
                {
                  type: "each",
                  source: "${favorites}",
                  visibleOn: "${foooo == 1 && USER_PRIVACY == 'TRUE'}",
                  items: {
                    type: "panel",
                    title: {
                      type: "wrapper",
                      className: "flex justify-between items-center",
                      body: [
                        {
                          type: "image",
                          src: "/images/movie${SHOW_ID%8+1}.jpg",
                        },
                        {
                          type: "wrapper",
                          body: "SHOW_TITLE:${SHOW_TITLE}"
                        },
                        {
                          type: "action",
                          label: "go to movie detail page",
                          actionType: "link",
                          link: "/show/${SHOW_ID}"
                        }
                      ]
                    },
                    body: [                      
                      {
                        type: "wrapper",
                        body: "WATCHED:${WATCHED}"
                      }
                    ]
                  }
                },
                {
                  type: "html",
                  html: "<h2>pref_genre</h2>"
                },
                {
                  "type": "radios",
                  "name": "fooooo",
                  "label": false,
                  "value": 1,
                  "options": [
                    {
                      "label": "show",
                      "value": 1
                    },
                    {
                      "label": "hide",
                      "value": 2
                    }
                  ]
                },
                {
                  type: "each",
                  source: "${pref_genre}",
                  visibleOn: "${fooooo == 1 && USER_PRIVACY == 'TRUE'}",
                  items: {
                    type: "panel",
                    title: {
                      type: "wrapper",
                      className: "flex justify-between items-center",
                      body: [                        
                        {
                          type: "wrapper",
                          body: "GENRE_NAME:${GENRE_NAME}"
                        }
                        
                      ]
                    },
                    body: [                      
                      
                    ]
                  }
                },
                {
                  type: "html",
                  html: "<h2>pref_actor</h2>"
                },
                {
                  "type": "radios",
                  "name": "foooooo",
                  "label": false,
                  "value": 1,
                  "options": [
                    {
                      "label": "show",
                      "value": 1
                    },
                    {
                      "label": "hide",
                      "value": 2
                    }
                  ]
                },
                {
                  type: "each",
                  source: "${pref_actor}",
                  visibleOn: "${foooooo == 1 && USER_PRIVACY == 'TRUE'}",
                  items: {
                    type: "panel",
                    title: {
                      type: "wrapper",
                      className: "flex justify-evenly",
                      body: [   
                        {
                          type: "image",
                          src: "/images/actor${ACTOR_ID%5+1}.jpg",
                        },                     
                        {
                          type: "wrapper",
                          body: "ACTOR_NAME:${ACTOR_FNAME} ${ACTOR_MNAME} ${ACTOR_LNAME}"
                        }
                        
                      ]
                    },
                    body: [                      
                      
                    ]
                  }
                }
              ]
            }
          }
        }
        // {
        //   label: "favorite",
        //   url: "favorite",
        //   schema: {
        //     type: "page",
        //     title: "favorite",
        //     body: {
        //       type: "crud",
        //       api: "get:/api/favorite/list",
              
        //       "itemAction": {
        //         type: "button",
        //         actionType: "link",
        //         url: "/user/${USER_ID}"
        //       },
        //       "columnsTogglable": false,
        //       "columns": [
        //         {
        //           "name": "USER_ID",
        //           "label": "USER_ID",
        //           "width": 20,
        //           "type": "text"
                  
        //         },
        //         {
        //           "name": "USER_NAME",
        //           "label": "USER_NAME",
        //           "type": "text",
        //           "width": 80,
        //         },
        //         {
        //           "name": "SHOW_ID",
        //           "label": "SHOW_ID",
        //           "type": "text",
        //           "width": 20
        //         },
        //         {
        //           "name": "SHOW_TITLE",
        //           "label": "SHOW_TITLE",
        //           "type": "text"
        //         },
        //         {
        //           "name": "WATCHED",
        //           "label": "WATCHED",
        //           "type": "text"
        //         }
        //       ]

              
        //     }
        //   }
        // }
        
      ]
    }
  ]
};

function normalizeLink(to, location = history.location) {
to = to || '';

if (to && to[0] === '#') {
  to = location.pathname + location.search + to;
} else if (to && to[0] === '?') {
  to = location.pathname + to;
}

const idx = to.indexOf('?');
const idx2 = to.indexOf('#');
let pathname = ~idx
  ? to.substring(0, idx)
  : ~idx2
  ? to.substring(0, idx2)
  : to;
let search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : '';
let hash = ~idx2 ? to.substring(idx2) : location.hash;

if (!pathname) {
  pathname = location.pathname;
} else if (pathname[0] != '/' && !/^https?\:\/\//.test(pathname)) {
  let relativeBase = location.pathname;
  const paths = relativeBase.split('/');
  paths.pop();
  let m;
  while ((m = /^\.\.?\//.exec(pathname))) {
  if (m[0] === '../') {
    paths.pop();
  }
  pathname = pathname.substring(m[0].length);
  }
  pathname = paths.concat(pathname).join('/');
}

return pathname + search + hash;
}

function isCurrentUrl(to, ctx) {
if (!to) {
  return false;
}
const pathname = history.location.pathname;
const link = normalizeLink(to, {
  ...location,
  pathname,
  hash: ''
});

if (!~link.indexOf('http') && ~link.indexOf(':')) {
  let strict = ctx && ctx.strict;
  return match(link, {
  decode: decodeURIComponent,
  strict: typeof strict !== 'undefined' ? strict : true
  })(pathname);
}

return decodeURI(pathname) === link;
}

let amisInstance = amis.embed(
'#root',
app,
{
  location: history.location,
  locale: 'en-US'
},
{
  requestAdaptor(api) {
    console.log(api)
    return {
      ...api,
      headers: {
        authorization: localStorage.getItem("token")
      }
    }
  },
  responseAdaptor(payload, response) {
    console.log(response)
    if (response.status === 401) history.push('/login')
    return response
  },
  // watchRouteChange: fn => {
  //   return history.listen(fn);
  // },
  updateLocation: (location, replace) => {
  location = normalizeLink(location);
  if (location === 'goBack') {
    return history.goBack();
  } else if (
    (!/^https?\:\/\//.test(location) &&
    location ===
      history.location.pathname + history.location.search) ||
    location === history.location.href
  ) {
    // 目标地址和当前地址一样，不处理，免得重复刷新
    return;
  } else if (/^https?\:\/\//.test(location) || !history) {
    return (window.location.href = location);
  }

  history[replace ? 'replace' : 'push'](location);
  },
  jumpTo: (to, action) => {
  if (to === 'goBack') {
    return history.goBack();
  }

  to = normalizeLink(to);

  if (isCurrentUrl(to)) {
    return;
  }

  if (action && action.actionType === 'url') {
    action.blank === false
    ? (window.location.href = to)
    : window.open(to, '_blank');
    return;
  } else if (action && action.blank) {
    window.open(to, '_blank');
    return;
  }

  if (/^https?:\/\//.test(to)) {
    window.location.href = to;
  } else if (
    (!/^https?\:\/\//.test(to) &&
    to === history.pathname + history.location.search) ||
    to === history.location.href
  ) {
    // do nothing
  } else {
    history.push(to);
  }
  },
  isCurrentUrl: isCurrentUrl,
  theme: 'cxd'
}
);

history.listen(state => {
amisInstance.updateProps({
  location: state.location || state
});
});
})();