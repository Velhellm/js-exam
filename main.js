$(function(){
    /**----------------------------------меню входа в аккаунт------------------------------------ */

    $('.banner').before('<div class="userLogInMenu">');
    $('.userLogInMenu').append('<input id="userLogIn" type="text" class="userLogIn" placeholder="Логин">');
    $('.userLogInMenu').append('<input id="userPass" type="text" class="userPass" placeholder="Пароль">');
    $('.userLogInMenu').append('<button type="submit" class="logIn btn">Войти');
    $('.userLogInMenu').append('<button type="submit" class="regUser btn">Регистрация');
    $('.userLogInMenu').append('<div class="close valClose">&#10006</div>');
    const entryMenu = $('.userLogInMenu');
    entryMenu.hide();


    userLogged = () =>{
        //достаём сохраненные данные пользователей из localStorage 
        const savedUsers = JSON.parse(localStorage.getItem('users')) || {};
        /* Щас будет сложно:)
        1. разделяем объект по разделителю ";"
        2. фильтруем через RegExp по началу строки "user=", чтобы найти конкретную запись [0]
        3. разделяем оставшийся объект на ключ:значение
        4. из пункта 3 получаем значение по ключу
        */
        const userInCookie = document.cookie.split(';').filter(item => RegExp(/^user=/).test(item))[0].split('=')[1];
        //проверяем наличие логина пользователя, который взяли из cookie, сохраненного в localStorageю. 
        //Возвращаем true/false
        userInCookie in savedUsers
    }

    //проверка наличия входа в учётную запись 
    function renderMenu(){
        if (userLogged) {
            showLogOutMenu()
        }
        else{
            showEntMenu()
        }
    }

    
    renderMenu()

    //открытие меню по клику на иконке пользователя
    showEntMenu = () =>{
        $('.userImg').click(function () {
        entryMenu.show()
        });
    }

    //создание меню доступа к ЛК и меню выхода из учётной записи
    $('.header-main').append('<div class="logOutMenu"></div>');
    const logOutMenu = $('.logOutMenu');
    logOutMenu.append('<span class="accountRef">Личный кабинет</span>');
    logOutMenu.append('<span class="logOut">Выход</span>');
    logOutMenu.hide()

    //вызов меню доступа к ЛК и выходу
    showLogOutMenu = () =>{
        logOutMenu.show()
        $('.header-controls#text').remove(text)
    }

    //вызов ЛК по нажатию на ссылку
    $('.accountRef').click(function(){
        accountShow()
        //закрываем меню доступа к ЛК
        logOutMenu.hide()
    });

    //запускаем функцию выхода из аккаунта при клике на "Выход"
    $('.logOut').click(function(){
        logOut()
    })
        
    // //Функция выхода из аккаунта
    logOut=()=>{
        localStorage.removeItem('currentUser');
        logOutMenu.hide()

    }

    //закрытие окна входа при клике на Х
    const valClose = $('.valClose');
    valClose.click(function(){
        entryMenu.hide()
    })

    
    

    //вход в аккаунт при нажатии на кнопку "Войти"
    const logIn = $('.logIn');
    logIn.click(function(){
        //Валидация введённых логина и пароля
        validate = ()=>{
            const logIn = $('.userLogIn').val();
            const password = $('.userPass').val();
            const check = RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/);
            if(check.test(logIn)&&check.test(password)){
                //запускаем проверку пользователя
                entryMenu.hide()
            //Выводим ошибку,очищаем форму   
            }else{
                alert('Введите корректные Имя и Пароль')
                $('.userLogIn').val('');
                $('.userPass').val('');
            }
        }
        validate()        
    })
    

    //вызов меню регистрации при нажатии на кнопку "Регистрация"
    const regUser = $('.regUser');
    regUser.click(function(){
        entryMenu.hide()
        registration.show();
    })


    /**----------------------------------меню регистрации------------------------------------ */

    //Добавляем меню регистрации
    $('.banner').before('<div class="registration">');
    $('.registration').append('<div class="close regClose">&#10006</div>');
    const registration = $('.registration');
    registration.hide()
    //добавляем поля ввода для регистрации
    $('.registration').append('<input id="setLogIn" type="text" class="setLogIn" placeholder="Логин">');
    $('.registration').append('<input id="setPass" type="text" class="setPass" placeholder="Пароль">');
    $('.registration').append('<button type="submit" class="subBtn btn">Отправить');
    //закрытие окна при клике на Х
    $('.regClose').click(function(){
        registration.hide()
    })

    //Регистрация пользователя
    $('.subBtn').click(regValidate = () =>{
        //Валидация введённых данных
        const login = $('.setLogIn').val();
        const password = $('.setPass').val();
        const regCheck = RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/);
        //Проверка вводимого имени
        if(regCheck.test(login)&&regCheck.test(password)){
            //если имя уже имеется
            for (let key in localStorage){
                if(key === login){
                    alert('Данное имя уже зарегистрировано')
                    //Если валидация пройдена
                }else{
                    users = JSON.parse(localStorage.getItem('users')) || {}
                    users[login] = {password: password}
                    localStorage.setItem('users',JSON.stringify(users));
                    document.cookie=('user=' + login);
                    //чистим поля, убираем меню регистрации
                    $('.setLogIn').val('');
                    $('.setPass').val('');
                    const registration = $('.registration');
                    registration.hide()
                }
            }
        //иначе выводим ошибку
        }else{
            alert('Введите корректные Имя и Пароль')
            $('.setLogIn').val('');
            $('.setPass').val('');
        }
    })


    /**----------------------------------личный кабинет------------------------------------ */

    //личный кабинет
    $('.banner').before('<div class="personalAccount">');
    $('.personalAccount').append('<div class="close accClose">&#10006</div>');
    $('.personalAccount').append('<form class="accForm">');
    const account = $('.personalAccount');
    account.hide()

    accountShow = () =>{
        account.show()
    }

    //добавляем фото пользователя
    $('.accForm').append('<div class="userPhoto">');
    $('.userPhoto').append('<img src="img/defaultImg.jpg" class="defaultImg">')
    $('.userPhoto').append('<button class="addPhoto btn">Добавить фото')
    
    //добавляем формы вывода данных из окна регистрации 
    $('.accForm').append('<div class="formInput">');
    $('.formInput').append('<span class="fstName">Имя:</span>');
    $('.formInput').append('<span class="lastName">Фамилия:</span>');

    //добавляем формы вывода увлечений 
    $('.accForm').append('<div class="hobbiesInput">');
    $('.hobbiesInput').append('<p>О себе:</p>');
    $('.hobbiesInput').append('<button class="addHobbies btn">Добавить увлечения');

    const addHobbies = $(".addHobbies");
    addHobbies.click(function(){
        $('.hobbiesInput').append('<div class="newHobbies">')
        $('.newHobbies').append('<textarea type="textArea" rows=5 class="userHobbies">')
        $('.newHobbies').append('<button class="saveHobbies btn">Сохранить')
    })
    
    
    //закрытие окна ЛК при клике на Х
    $('.accClose').click(function(){
        account.hide()
    })

})  