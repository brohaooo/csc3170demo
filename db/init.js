const query = require('./query')

const sqlDropTables = `
    drop table if exists
    HISTORIES,GENRES,DIRECTORS,FAVORITES,PREF_GENRE,PREF_ACTOR,SHOW_DIR,SHOW_GENRE,  REVIEWS,SHOWS,ACTORS,SHOW_ACT,USERS
    
`
//-----------------------------------------------------------------------------------------


const sqlCreateTableSHOWS = `
CREATE TABLE IF NOT EXISTS SHOWS
	(SHOW_ID          INT(10) AUTO_INCREMENT PRIMARY KEY,
     SHOW_TYPE        VARCHAR(10)      NOT NULL,
     SHOW_TITLE       VARCHAR(10)      NOT NULL,
     DATE_ADDED       VARCHAR(10)      NOT NULL,
     RELEASE_YEAR     VARCHAR(10)      NOT NULL,
     SHOW_RATING      VARCHAR(10)      NOT NULL,
     SHOW_DURATION    VARCHAR(10)      NOT NULL,
     SHOW_DESCRIPTION VARCHAR(10),
     SHOW_RANK        VARCHAR(10)      NOT NULL,
     SHOW_AVG_SCORE   VARCHAR(10)
     )engine=innodb default charset=utf8
`



//-----------------------------------------------------------------------------------------


const sqlCreateTableACTORS = `
CREATE TABLE IF NOT EXISTS ACTORS
	(ACTOR_ID          INT(10) AUTO_INCREMENT PRIMARY KEY,
     ACTOR_FNAME       VARCHAR(10)     NOT NULL,
     ACTOR_MNAME       VARCHAR(10),
     ACTOR_LNAME       VARCHAR(10)     NOT NULL,
     ACTOR_GENDER      VARCHAR(10),
     ACTOR_BIRTH       VARCHAR(10),
     ACTOR_DESCRIPTION VARCHAR(100)
     )engine=innodb default charset=utf8
`






//-----------------------------------------------------------------------------------------

const sqlCreateTableUSERS = `
CREATE TABLE IF NOT EXISTS USERS
(USER_ID          INT(10) AUTO_INCREMENT PRIMARY KEY,
 USER_PASSWORD    VARCHAR(10)    NOT NULL,
 USER_NAME        VARCHAR(10)    NOT NULL,
 USER_EMAIL       VARCHAR(20)    NOT NULL   UNIQUE,
 USER_PHONE       VARCHAR(10)    UNIQUE,
 USER_RANK        VARCHAR(10)    NOT NULL,
 USER_GENDER      VARCHAR(10),
 USER_REGION      VARCHAR(10),
 USER_REG_DATE    VARCHAR(20)    NOT NULL,
 USER_BIRTU       VARCHAR(10)    NOT NULL,
 USER_PRIVACY     VARCHAR(10)    NOT NULL
 )engine=innodb default charset=utf8
`




//-----------------------------------------------------------------------------------------


const sqlCreateTableSHOW_ACT =
`
CREATE TABLE IF NOT EXISTS SHOW_ACT
(SHOW_ID     INT(10),
 ACTOR_ID    INT(10),
 PRIMARY KEY (SHOW_ID, ACTOR_ID),
 FOREIGN KEY (SHOW_ID) REFERENCES SHOWS(SHOW_ID),
 FOREIGN KEY (ACTOR_ID) REFERENCES ACTORS(ACTOR_ID))
 engine=innodb default charset=utf8
 `






//-----------------------------------------------------------------------------------------


const sqlCreateTableREVIEWS =
`
CREATE TABLE IF NOT EXISTS REVIEWS
(USER_ID          INT(10),
 SHOW_ID          INT(10),
 REVIEW_TIME      VARCHAR(20),
 SCORE            VARCHAR(10)     NOT NULL,
 COMMENTS         VARCHAR(20),
 PRIMARY KEY (USER_ID, SHOW_ID, REVIEW_TIME),
 FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
 FOREIGN KEY (SHOW_ID) REFERENCES SHOWS(SHOW_ID))
 engine=innodb default charset=utf8
 `

//-----------------------------------------------------------------------------------------
const sqlCreateTableHISTORIES = 
`
CREATE TABLE HISTORIES
	(USER_ID          INT(10),
     SHOW_ID          INT(10),
	 START_TIME       DATETIME,
     END_TIME         DATETIME     NOT NULL,
     WATCH_COUNT      INT(10)     NOT NULL,
     END_POSITION     TIME     NOT NULL,
     PRIMARY KEY (USER_ID, SHOW_ID, START_TIME),
     FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
     FOREIGN KEY (SHOW_ID) REFERENCES SHOWS(SHOW_ID))
`










//-----------------------------------------------------------------------------------------
const sqlCreateTableGENRES =
`
CREATE TABLE GENRES
	(GENRE_ID   INT(10) AUTO_INCREMENT PRIMARY KEY,
     GENRE_NAME VARCHAR(10)     NOT NULL    UNIQUE
     )
`












//-----------------------------------------------------------------------------------------
const sqlCreateTableDIRECTORS =
`
CREATE TABLE DIRECTORS
	(DIR_ID          INT(10) AUTO_INCREMENT PRIMARY KEY,
     DIR_LNAME       VARCHAR(10)    NOT NULL,
     DIR_MNAME       VARCHAR(10),
     DIR_FNAME       VARCHAR(10)    NOT NULL,
     DIR_GENDER      VARCHAR(10),
     DIR_BIRTH       DATE,
     DIR_DESCRIPTION VARCHAR(1000)
     )
`











//-----------------------------------------------------------------------------------------
const sqlCreateTableFAVORITES = 
`
CREATE TABLE FAVORITES
	(USER_ID        INT(10),
	 SHOW_ID        INT(10),
     WATCHED        VARCHAR(10)      NOT NULL,
     PRIMARY KEY (USER_ID, SHOW_ID),
     FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
     FOREIGN KEY (SHOW_ID) REFERENCES SHOWS(SHOW_ID))
`









//-----------------------------------------------------------------------------------------
const sqlCreateTablePREF_GENRE = 
`
CREATE TABLE PREF_GENRE
	(USER_ID          INT(10),
     GENRE_ID         INT(10),
     PRIMARY KEY (USER_ID, GENRE_ID),
     FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
     FOREIGN KEY (GENRE_ID) REFERENCES GENRES(GENRE_ID))
`











//-----------------------------------------------------------------------------------------
const sqlCreateTablePREF_ACTOR = 
`
CREATE TABLE PREF_ACTOR
	(USER_ID          INT(10),
     ACTOR_ID         INT(10),
     PRIMARY KEY (USER_ID, ACTOR_ID),
     FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
     FOREIGN KEY (ACTOR_ID) REFERENCES ACTORS(ACTOR_ID))
`










//-----------------------------------------------------------------------------------------
const sqlCreateTableSHOW_DIR = 
`
CREATE TABLE SHOW_DIR
	(SHOW_ID     INT(10),
     DIR_ID      INT(10),
     PRIMARY KEY (SHOW_ID, DIR_ID),
     FOREIGN KEY (SHOW_ID) REFERENCES SHOWS(SHOW_ID),
     FOREIGN KEY (DIR_ID)  REFERENCES DIRECTORS(DIR_ID))
`










//-----------------------------------------------------------------------------------------
const sqlCreateTableSHOW_GENRE = 
`
CREATE TABLE SHOW_GENRE
	(SHOW_ID    INT(10),
     GENRE_ID   INT(10),
     PRIMARY KEY (SHOW_ID, GENRE_ID),
     FOREIGN KEY (SHOW_ID) REFERENCES SHOWS(SHOW_ID),
     FOREIGN KEY (GENRE_ID) REFERENCES GENRES(GENRE_ID))
`








//-----------------------------------------------------------------------------------------
const init = async (reset) => {
    try {
        if (reset) {
        console.log("resetting tables...")


        
        await query(sqlDropTables)
        await query(sqlCreateTableSHOWS)
        await query(sqlCreateTableACTORS)
        await query(sqlCreateTableUSERS)
        await query(sqlCreateTableSHOW_ACT)
        await query(sqlCreateTableREVIEWS)

        await query(sqlCreateTableHISTORIES)
        await query(sqlCreateTableGENRES)
        await query(sqlCreateTableDIRECTORS)
        await query(sqlCreateTableFAVORITES)
        await query(sqlCreateTablePREF_ACTOR)
        await query(sqlCreateTablePREF_GENRE)
        await query(sqlCreateTableSHOW_DIR)
        await query(sqlCreateTableSHOW_GENRE)

        


        for (let i = 1; i <= 25; i++) {
            let name = '小马宝莉' + i;
            let pony = 'Twilight' + i;
            let ID =  i;
            await query(
            `
            insert into SHOWS(SHOW_TYPE, SHOW_TITLE,DATE_ADDED,RELEASE_YEAR,SHOW_RATING,SHOW_DURATION,SHOW_DESCRIPTION,SHOW_RANK,SHOW_AVG_SCORE) 
            value('少儿','${name}','2022','2012','5','21','友谊就是魔法','RANK_1','${i%5+(i%7)/10}')
            `)
            
            await query(`
            insert into ACTORS(ACTOR_FNAME, ACTOR_MNAME, ACTOR_LNAME, ACTOR_GENDER,ACTOR_BIRTH,ACTOR_DESCRIPTION) 
            value('${pony}','','Sparkle','female','2012.7.25','她是友谊公主')
            `)
            //value('Lauren','','Faust','female','1974.7.25','美国动画师、编剧、导演和制片人')
        }

        await query(
        `
        insert into USERS(USER_PASSWORD, USER_NAME, USER_EMAIL,USER_PHONE,USER_RANK,USER_GENDER,USER_REGION,USER_REG_DATE,USER_BIRTU,USER_PRIVACY) 
        value('123456','root','123456@qq.com','18926346','VIP_1','homo','CHINA',now(),'2001.3.8','yes' )
        `)

        await query(
            `
            insert into USERS(USER_PASSWORD, USER_NAME, USER_EMAIL,USER_PHONE,USER_RANK,USER_GENDER,USER_REGION,USER_REG_DATE,USER_BIRTU,USER_PRIVACY) 
            value('123456','root2','123@qq.com','1892346','VIP_2','male','CHINA',now(),'2001.5.8','no' )
            `)
        
        for (let i = 1; i <= 21; i++) {
            for (let j = i; j <= 21; j++) {
                await query(`insert into SHOW_ACT( SHOW_ID, ACTOR_ID) 
                value( ${i}, ${j})`)
            }
        }

        for (let i = 1; i <= 21; i++) {
            let comment = '好看!' + i
            let show_id = i % 21 + 1
            await query(
            `
            insert into REVIEWS(USER_ID,SHOW_ID,REVIEW_TIME,SCORE,COMMENTS) 
            value(1, ${show_id},now() , '5','${comment}')
            `
            )
        }
        //新的八张表
        for (let i = 1; i <= 21; i++) {
            let watch_count =  i
            let show_id = i % 21 + 1
            let genre_type = '少儿' + i
            let dir_name = '劳伦浮士德' + i
            await query(
            `
            insert into HISTORIES(USER_ID,SHOW_ID,START_TIME,END_TIME,WATCH_COUNT,END_POSITION) 
            value(1, ${show_id},now() , now(),${watch_count},'08:00:00')
            `
            )
            await query(
            `
            insert into GENRES(GENRE_NAME) 
            value("${genre_type}")
            `
            )
            await query(
            `
            insert into DIRECTORS(DIR_LNAME,DIR_MNAME,DIR_FNAME,DIR_GENDER,DIR_BIRTH,DIR_DESCRIPTION) 
            value("${dir_name}",'L','F','female','1977-02-02','好导演')
            `
            )
            await query(
            `
            insert into FAVORITES(USER_ID,SHOW_ID,WATCHED) 
            value(1,${i},"no")
            `
            )
            await query(
            `
            insert into PREF_GENRE(USER_ID,GENRE_ID) 
            value(1,${i})
            `
            )
            await query(
            `
            insert into PREF_ACTOR(USER_ID,ACTOR_ID) 
            value(1,${(i+1)%21+1})
            `
            )
            await query(
            `
            insert into SHOW_DIR(SHOW_ID,DIR_ID) 
            value(${i},${i})
            `
            )
            await query(
            `
            insert into SHOW_GENRE(SHOW_ID,GENRE_ID) 
            value(${i},${i})
            `
            )
            await query(
            `
            insert into SHOW_GENRE(SHOW_ID,GENRE_ID) 
            value(${(i+3)%21+1},${i})
            `
            )


        }

        }

    } catch(e) {
        console.log(e)
    }
}

module.exports = init