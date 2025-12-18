/* --- LƯU TẠI: assets/js/pages/FAQ.js --- */

const translations = {
    en: {
        navHome: "Home", navAbout: "About", navTips: "Tips", navFAQ: "FAQ", navTyping: "Typing",
        navLanguage: "Language", navLogin: "Login",
        faqTitle: "Frequently Asked Questions",
        faqSubtitle: "Common questions regarding typing speed and techniques",
        tocTitle: "Table of Contents",
        
        // Tiêu đề câu hỏi
        q1Title: "What is a typing test?",
        q2Title: "What is a typing test for?",
        q3Title: "Why practice typing?",
        q4Title: "How long do I need to practice?",
        q5Title: "What is WPM?",
        q6Title: "What are net keystrokes?",
        q7Title: "What are gross keystrokes?", 
        q8Title: "What are total keystrokes?",
        q9Title: "Accuracy vs Actual Accuracy?",
        q10Title: "What is touch typing?",
        q11Title: "How to practice touch typing?",
        q12Title: "What is muscle memory?",
        q13Title: "How to type faster?",
        q14Title: "What is the average typing speed?",

        // Nội dung chi tiết (GIỮ NGUYÊN GỐC TỪ HTML)
        q1Desc: "A typing test is a practical test that measures a person's speed and accuracy when typing text. Therefore, anyone who wants a good result on a typing test needs to be able to type quickly and without making too many mistakes.",
        
        q2Desc: "A typing test is a way to check how fast someone can type and how accurately they can do it. This type of test is part of the selection process for some professions and is one of the elimination criteria. Anyone who intends to join in legal areas, for example, will need to pass such a test. This is because the speed and quality of typing of those who will perform these positions is essential for the tasks that will be assigned to them.",
        
        q3Desc: "The first and clearest benefit of practicing typing is time savings. Let's say, for example, that someone can type a text at a speed of 30 WPM (words per minute). If this same person practices and manages to reach a speed of 60 WPM, they will be able to type the same text in half the time it took the first time. This means that this person will be able to perform their typing activities at twice their initial speed.<br><br>In this sense, by practicing typing with the right techniques, you will evolve and be able to finish your work in less time. You will also be able to communicate on the internet more quickly and efficiently. You will be able to respond faster to your customers, co-workers and friends, interact much more dynamically on social networks and communicate quickly in online games.<br><br>Another advantage of practicing typing is that it decreases physical strain and increases comfort in activities involving a computer. By applying the right typing techniques, your hands and fingers will move much less and more efficiently while typing. Also, the time you need to spend in front of the computer will be less, as your activities will be completed in less time.",
        
        q4Desc: "The ideal is to practice 10 to 20 minutes a day. The increase in typing speed varies from person to person, but by consistently practicing with the right techniques, results can be seen within a month or three.",
        
        q5Desc: "WPM stands for “words per minute”. This abbreviation is used as a unit of measurement to represent typing speed. A person who has achieved a typing speed of 60 WPM on a typing test, for example, can type approximately 60 words per minute.",
        
        q6Desc: "Net keystrokes is the number of correct characters per minute that were entered in a typing test. Saying that someone has reached 200 net keystrokes, for example, means saying that this person has typed approximately 200 correct characters every minute.",
        
        q7Desc: "Gross keystrokes is the total number of characters, correct or incorrect, entered in a typing test. Only the final content of the test is considered, that is, corrections are not counted.",
        
        q8Desc: "Total keystrokes are all characters, correct or incorrect, that were entered during a typing test. Characters that have been corrected are also counted.",
        
        q9Desc: "Accuracy shows how much of the test content was typed correctly. Only the final typed content is taken into account, that is, corrections made during the test are not counted.<br><br>Actual accuracy also shows how much of the test content was typed correctly. However, in actual accuracy everything that was typed is taken into account, including the corrections made during the test.",
        
        q10Desc: "Touch typing (Home Row) is a technique based on <strong>muscle memory (motion memory)</strong> in which a person types without looking at the keyboard. In this technique, the bumps on the “F” and “J” keys serve as a reference so that the keys can be found without the individual having to look at the keyboard. In the initial typing position, the four fingers of each hand are positioned on the central line of the keyboard and operate the other keys from that position, while the thumbs operate the space key.<br><br>This is one of the main techniques used for typing and is taught in many institutions and typing courses.",
        
        q11Desc: "The first step in practicing <strong>touch typing</strong> (Home Row technique) is to position your fingers correctly on the keyboard. To do this, use the bumps on the “F” and “J” keys to position the index finger of the left hand on the letter “F” and the one of the right hand on the letter “J”. This should be done without you looking at the keyboard.<br><br>The other fingers of the left hand should be positioned on the keys “A”, “S” and “D” while the ones on the right hand should be on the keys “K”, “L” and “;“ (or “Ç”). Finally, the thumbs should position themselves to press the “space” key.<br><br>Each finger is responsible for a group of keys and must always press the same keys and with the same movement. The keys “2”, “W”, “S” and “X”, for example, must always be pressed by the ring finger of the left hand.<br><br>The next step is to practice pressing the keys. There are many online tools that guide you through this process.<br><br>However, if you prefer, you can practice on your own. To do this, open a text editor (Word or Notepad) or any other tool where you can type. Then repeat pressing each key without looking at the keyboard. Always remember to use the correct fingers to press the keys.<br><br>Start by typing the letter “F” several times, looking at the screen and not looking at the keyboard, until you feel that you've gotten used to that key. Then do the same with the letters “J”, “D”, “K”, “S”, “L”, “A”, “;” (or “Ç”) and also with the other keys. After that, try typing the same keys alternately. When you realize that you can press all the main keys on the keyboard without looking, you can practice typing your name, words, phrases and then texts.<br><br>Learning touch typing is a process that is often difficult at first and can take a few days, so be patient. Remember that while practicing, the most important thing is to type everything (or almost everything) correctly, not the speed.<br><br>With practice, your brain will learn the correct movements to press each key and your speed will naturally increase. Then your typing movements will become automatic and you will no longer need to concentrate on the details of each movement. Everything will be much easier and natural. This is possible because of a process called <strong>muscle memory</strong>.",
        
        q12Desc: "Muscle memory is also known as movement memory. When we perform a movement many times, our brain creates a memory of that movement, that is, of the sequence of actions necessary (such as muscle contractions, for example) to perform that movement. The more repetitions of that movement, the stronger the memory for it becomes and thus, it can be performed automatically in the future, without the need to concentrate on it. This is what we call muscle memory, movement memory or motor memory. This is how we learn, for example, to ride a bicycle or play musical instruments.<br><br>In addition, depending on the movements performed (as in physical exercises), new nuclei are created in muscle cells. These nuclei make the results appear much faster for those who have started exercising again after some time off. This process is also considered as muscle memory.",
        
        q13Desc: "1. Stop looking at the keyboard.<br>2. Prioritize accuracy over speed.<br>3. Maintain good posture.<br>4. Practice rhythm.",
        
        q14Desc: "According to tests conducted by various typing websites, the average typing speed using a physical keyboard is 42 WPM (words per minute). The data pointing to this speed is based on more than 14 million tests performed in over 40 languages.<br><br>The average typing speed in the English language reaches 52 WPM. This is according to a controlled study conducted by Aalto University in Finland together with the University of Cambridge in the United Kingdom. This study involved 168,000 volunteers from various countries, totaling 136 million keystrokes. The highest speed recorded in this test was 120 WPM.<br><br>Considering that the language, the content of the tests and the way they are conducted can interfere with the results of the statistics, we can consider that the overall average typing speed is somewhere between 42 WPM and 52 WPM."
    },
    vi: {
        navHome: "Trang chủ", navAbout: "Giới thiệu", navTips: "Mẹo", navFAQ: "Hỏi đáp", navTyping: "Gõ phím",
        navLanguage: "Ngôn ngữ", navLogin: "Đăng nhập",
        faqTitle: "Câu hỏi thường gặp",
        faqSubtitle: "Mọi thứ bạn cần biết về gõ phím & NoobDev",
        tocTitle: "Mục lục",
        
        q1Title: "Kiểm tra đánh máy là gì?",
        q2Title: "Kiểm tra đánh máy để làm gì?",
        q3Title: "Tại sao nên tập đánh máy?",
        q4Title: "Tôi cần luyện tập bao lâu?",
        q5Title: "WPM là gì?",
        q6Title: "Net keystrokes là gì?",
        q7Title: "Gross keystrokes là gì?",
        q8Title: "Total keystrokes là gì?",
        q9Title: "Độ chính xác vs Độ chính xác thực tế?",
        q10Title: "Touch typing là gì?",
        q11Title: "Làm thế nào để luyện tập touch typing?",
        q12Title: "Trí nhớ cơ bắp là gì?",
        q13Title: "Làm thế nào để gõ nhanh hơn?",
        q14Title: "Tốc độ gõ trung bình là bao nhiêu?",

        // Nội dung chi tiết (DỊCH ĐẦY ĐỦ TỪ FILE WORD)
        q1Desc: "Kiểm tra đánh máy là một bài kiểm tra thực tế đo tốc độ và độ chính xác của một người khi nhập văn bản. Do đó, bất kỳ ai muốn có kết quả tốt trong bài kiểm tra đánh máy cần có khả năng gõ nhanh và không mắc quá nhiều lỗi.",
        
        q2Desc: "Kiểm tra đánh máy là một cách để kiểm tra xem ai đó có thể gõ nhanh như thế nào và họ có thể thực hiện chính xác như thế nào. Loại bài kiểm tra này là một phần của quá trình lựa chọn đối với một số ngành nghề và là một trong những tiêu chí loại bỏ. Ví dụ, bất kỳ ai có ý định tham gia vào các lĩnh vực pháp lý sẽ cần phải vượt qua bài kiểm tra như vậy. Điều này là do tốc độ và chất lượng đánh máy của những người sẽ thực hiện các vị trí này là điều cần thiết cho các nhiệm vụ sẽ được giao cho họ.",
        
        q3Desc: "Lợi ích đầu tiên và rõ ràng nhất của việc thực hành đánh máy là tiết kiệm thời gian. Ví dụ, giả sử ai đó có thể gõ văn bản với tốc độ 30 WPM (từ mỗi phút). Nếu cùng một người này thực hành và đạt được tốc độ 60 WPM, họ sẽ có thể gõ cùng một văn bản trong một nửa thời gian so với lần đầu tiên. Điều này có nghĩa là người này sẽ có thể thực hiện các hoạt động đánh máy của họ với tốc độ gấp đôi tốc độ ban đầu.<br><br>Theo nghĩa này, bằng cách thực hành đánh máy với các kỹ thuật phù hợp, bạn sẽ phát triển và có thể hoàn thành công việc của mình trong thời gian ngắn hơn. Bạn cũng sẽ có thể giao tiếp trên internet nhanh chóng và hiệu quả hơn. Bạn sẽ có thể phản hồi nhanh hơn với khách hàng, đồng nghiệp và bạn bè của mình, tương tác năng động hơn nhiều trên mạng xã hội và giao tiếp nhanh chóng trong các trò chơi trực tuyến.<br><br>Một ưu điểm khác của việc luyện tập đánh máy là nó làm giảm căng thẳng thể chất và tăng sự thoải mái trong các hoạt động liên quan đến máy tính. Bằng cách áp dụng các kỹ thuật gõ phù hợp, bàn tay và ngón tay của bạn sẽ di chuyển ít hơn và hiệu quả hơn nhiều trong khi gõ. Ngoài ra, thời gian bạn cần dành trước máy tính sẽ ít hơn, vì các hoạt động của bạn sẽ được hoàn thành trong thời gian ngắn hơn.",
        
        q4Desc: "Lý tưởng nhất là luyện tập từ 10 đến 20 phút mỗi ngày. Sự gia tăng tốc độ đánh máy khác nhau ở mỗi người, nhưng bằng cách liên tục thực hành với các kỹ thuật phù hợp, kết quả có thể được nhìn thấy trong vòng một hoặc ba tháng.",
        
        q5Desc: "WPM là viết tắt của \"words per minute\" (từ mỗi phút). Chữ viết tắt này được sử dụng như một đơn vị đo lường để biểu thị tốc độ đánh máy. Ví dụ, một người đã đạt được tốc độ đánh máy là 60 WPM trong bài kiểm tra đánh máy, có thể gõ khoảng 60 từ mỗi phút.",
        
        q6Desc: "Số lần gõ phím ròng (Net keystrokes) là số ký tự chính xác mỗi phút đã được nhập trong bài kiểm tra đánh máy. Ví dụ, nói rằng ai đó đã đạt đến 200 lần gõ phím ròng có nghĩa là nói rằng người này đã gõ đúng khoảng 200 ký tự mỗi phút.",
        
        q7Desc: "Tổng số lần gõ phím (Gross keystrokes) là tổng số ký tự, đúng hoặc sai, được nhập trong bài kiểm tra đánh máy. Chỉ nội dung cuối cùng của bài kiểm tra được xem xét, tức là các chỉnh sửa không được tính.",
        
        q8Desc: "Tổng số lần gõ phím (Total keystrokes) là tất cả các ký tự, đúng hoặc sai, được nhập trong quá trình kiểm tra đánh máy. Các ký tự đã được sửa cũng được tính.",
        
        q9Desc: "Độ chính xác (Accuracy) cho biết có bao nhiêu nội dung thử nghiệm được nhập chính xác. Chỉ nội dung được đánh máy cuối cùng mới được tính đến, tức là các chỉnh sửa được thực hiện trong quá trình kiểm tra không được tính.<br><br>Độ chính xác thực tế (Actual Accuracy) cũng cho biết có bao nhiêu nội dung thử nghiệm được nhập chính xác. Tuy nhiên, về độ chính xác thực tế, mọi thứ được đánh máy đều được tính đến, bao gồm cả các chỉnh sửa được thực hiện trong quá trình thử nghiệm.",
        
        q10Desc: "Gõ cảm ứng (Touch typing - Home Row) là một kỹ thuật dựa trên <strong>phản xạ có điều kiện (trí nhớ cơ bắp)</strong>, trong đó một người gõ mà không cần nhìn vào bàn phím. Trong kỹ thuật này, các vết lồi trên các phím \"F\" và \"J\" đóng vai trò là tài liệu tham khảo để có thể tìm thấy các phím mà không cần phải nhìn vào bàn phím.",
        
        q11Desc: "Bước đầu tiên trong việc thực hành gõ cảm ứng là định vị các ngón tay của bạn một cách chính xác trên bàn phím. Để thực hiện việc này, hãy sử dụng các vết lồi trên phím \"F\" và \"J\" để định vị ngón trỏ của bàn tay trái trên chữ \"F\" và ngón trỏ của bàn tay phải trên chữ \"J\".<br><br>Các ngón tay khác của bàn tay trái phải được đặt trên các phím \"A\", \"S\" và \"D\" trong khi các ngón tay ở tay phải phải nằm trên các phím \"K\", \"L\" và \";\". Cuối cùng, các ngón tay cái sẽ tự định vị để nhấn phím \"dấu cách\".<br><br>Mỗi ngón tay chịu trách nhiệm cho một nhóm phím và luôn phải nhấn các phím giống nhau với cùng một chuyển động. Ví dụ, các phím \"2\", \"W\", \"S\" và \"X\" luôn phải được nhấn bằng ngón áp út của bàn tay trái.<br><br>Bước tiếp theo là thực hành nhấn các phím. Bạn có thể sử dụng các công cụ trực tuyến hoặc trình soạn thảo văn bản. Bắt đầu bằng cách gõ chữ \"F\" nhiều lần, nhìn vào màn hình mà không nhìn vào bàn phím, cho đến khi bạn cảm thấy quen với phím đó. Sau đó làm tương tự với các phím khác.<br><br>Học gõ phím nhanh là một quá trình thường khó khăn ban đầu và có thể mất vài ngày, vì vậy hãy kiên nhẫn. Hãy nhớ rằng trong khi luyện tập, điều quan trọng nhất là gõ mọi thứ chính xác, chứ không phải tốc độ.",
        
        q12Desc: "Trí nhớ cơ bắp còn được gọi là trí nhớ vận động. Khi chúng ta thực hiện một động tác nhiều lần, bộ não của chúng ta sẽ tạo ra một ký ức về động tác đó. Càng lặp lại động tác đó nhiều lần, trí nhớ về nó càng mạnh mẽ và do đó, nó có thể được thực hiện tự động trong tương lai mà không cần phải tập trung vào nó.<br><br>Đây là cách chúng ta học, ví dụ, cách đi xe đạp hoặc chơi nhạc cụ. Ngoài ra, tùy thuộc vào các động tác được thực hiện, các nhân mới sẽ được tạo ra trong các tế bào cơ, giúp kết quả xuất hiện nhanh hơn khi tập luyện lại.",
        
        q13Desc: "1. Đừng nhìn vào bàn phím.<br>2. Ưu tiên độ chính xác hơn tốc độ.<br>3. Duy trì tư thế tốt.<br>4. Luyện tập nhịp điệu gõ đều đặn.",
        
        q14Desc: "Theo các bài kiểm tra được thực hiện bởi nhiều trang web đánh máy khác nhau, tốc độ đánh máy trung bình khi sử dụng bàn phím vật lý là 42 WPM (từ trên phút). Dữ liệu cho thấy tốc độ này dựa trên hơn 14 triệu bài kiểm tra được thực hiện bằng hơn 40 ngôn ngữ.<br><br>Tốc độ đánh máy trung bình bằng tiếng Anh đạt 52 WPM. Đây là kết quả nghiên cứu có kiểm soát do Đại học Aalto ở Phần Lan phối hợp với Đại học Cambridge ở Vương quốc Anh thực hiện. Tốc độ cao nhất được ghi nhận trong bài kiểm tra này là 120 WPM.<br><br>Xét đến việc ngôn ngữ, nội dung bài kiểm tra và cách thực hiện có thể ảnh hưởng đến kết quả thống kê, chúng ta có thể coi tốc độ đánh máy trung bình tổng thể nằm đâu đó trong khoảng từ 42 WPM đến 52 WPM."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initLanguage();
    initSmoothScrollAndHighlight();
});

// --- 1. LANGUAGE LOGIC ---
function initLanguage() {
    const btn = document.getElementById('languageBtn');
    const menu = document.getElementById('languageMenu');
    const userBtn = document.getElementById('userProfileNav');
    
    let currentLang = localStorage.getItem('language') || 'en';
    applyTranslation(currentLang);
    updateActiveLang(currentLang);

    if(btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });
    }

    if(userBtn) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userBtn.classList.toggle('active');
        });
    }

    document.querySelectorAll('.language-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = opt.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            applyTranslation(lang);
            updateActiveLang(lang);
            menu.classList.remove('active');
        });
    });

    document.addEventListener('click', () => { if(menu) menu.classList.remove('active'); });
}

function applyTranslation(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if(translations[lang][key]) {
            // Dùng innerHTML để hỗ trợ thẻ <br> và <strong>
            el.innerHTML = translations[lang][key];
        }
    });
}

function updateActiveLang(lang) {
    document.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.remove('active');
        if(opt.getAttribute('data-lang') === lang) opt.classList.add('active');
    });
}

// --- 2. SMOOTH SCROLL ---
function initSmoothScrollAndHighlight() {
    document.querySelectorAll('.faq-toc a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 140; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: "smooth" });

                document.querySelectorAll('.faq-card').forEach(card => card.classList.remove('active-highlight'));
                targetElement.classList.add('active-highlight');
                setTimeout(() => targetElement.classList.remove('active-highlight'), 2000);
            }
        });
    });
}

// --- 3. STARS ---
function initStars() {
    const container = document.getElementById('starsContainer');
    if(container) {
        for(let i=0; i< 600; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            const size = Math.random() * 2.5 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDelay = Math.random() * 4 + 's';
            star.style.opacity = Math.random() * 0.7 + 0.3;
            container.appendChild(star);
        }
    }
}