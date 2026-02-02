document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enterLessonBtn');

    enterBtn.addEventListener('click', (e) => {
        // Prevent default for now as we don't have a real link
        e.preventDefault();

        // Add a ripple effect or simple feedback
        enterBtn.innerHTML = "กำลังเข้าสู่ระบบ...";
        enterBtn.style.opacity = "0.8";

        setTimeout(() => {
            // Redirect to lessons page
            window.location.href = 'lessons.html';
        }, 800);
    });

    // Parallax effect for logo on mouse move
    const heroSection = document.querySelector('.hero-section');
    const heroLogo = document.querySelector('.hero-logo');

    heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        heroLogo.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.05)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        heroLogo.style.transform = `translateX(0) translateY(0) scale(1)`;
    });

    // Background Slideshow
    const bgSlideshow = document.getElementById('bgSlideshow');
    // Using standard relative paths from root
    const images = [
        'assets/PhotoBG/bg_main.jpg',
        'assets/PhotoBG/a1.jpg',
        'assets/PhotoBG/a53.jpg',
        'assets/PhotoBG/a8.jpg'
    ];

    function changeBackground() {
        if (!bgSlideshow) return;

        // Pick a random image
        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUrl = images[randomIndex];

        // Apply immediately
        bgSlideshow.style.backgroundImage = `url('${imageUrl}')`;
        // console.log("Background updated to:", imageUrl);
    }

    // Initial call
    changeBackground();

    // Change every 5 seconds (5000ms)
    setInterval(changeBackground, 5000);

    // Map Lightbox Logic
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const mapImg = document.querySelector(".school-map");
    const closeBtn = document.querySelector(".close-modal");

    if (mapImg && modal) {
        mapImg.onclick = function () {
            modal.style.display = "flex";
            modalImg.src = this.src;
        }
    }

    if (closeBtn && modal) {
        closeBtn.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Close when clicking outside the image
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /* --- Quiz Logic for Unit 1 --- */
    const quizStart = document.getElementById('quizStart');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResult = document.getElementById('quizResult');
    const startQuizBtn = document.getElementById('startQuizBtn');

    // Check if we are on the page with the quiz
    if (quizStart && startQuizBtn) {

        // Quiz Data - Pool of 6 Questions
        const questionPool = [
            {
                text: "องค์ประกอบใดของแนวคิดเชิงคำนวณหมายถึงการแตกปัญหาใหญ่เป็นปัญหาย่อย?",
                options: ["Abstraction", "Decomposition", "Pattern Recognition", "Algorithm Design"],
                correct: 1 // Index of correct answer
            },
            {
                text: "การหาสิ่งที่เหมือนกันหรือความสัมพันธ์ของปัญหา คือองค์ประกอบใด?",
                options: ["Decomposition", "Pattern Recognition", "Abstraction", "Coding"],
                correct: 1
            },
            {
                text: "การดูแผนที่รถไฟฟ้าโดยไม่สนใจรายละเอียดตึกข้างทาง ตรงกับแนวคิดใด?",
                options: ["Abstraction (การคิดเชิงนามธรรม)", "Decomposition (การแยกย่อย)", "Algorithm (อัลกอริทึม)", "Pattern (รูปแบบ)"],
                correct: 0
            },
            {
                text: "ข้อใดคือตัวอย่างของ Algorithm Design?",
                options: ["การแยกส่วนประกอบรถจักรยาน", "การสังเกตว่าฝนตกทำให้รถติด", "การเขียนขั้นตอนการทำอาหาร 1, 2, 3", "การตัดรายละเอียดที่ไม่จำเป็นออก"],
                correct: 2
            },
            {
                text: "แนวคิดเชิงคำนวณมีประโยชน์อย่างไร?",
                options: ["ช่วยให้พิมพ์ดีดได้เร็วขึ้น", "ช่วยให้แก้ปัญหาได้อย่างเป็นระบบ", "ช่วยให้ซ่อมคอมพิวเตอร์ได้", "ช่วยให้เล่นเกมเก่งขึ้น"],
                correct: 1
            },
            {
                text: "เราสามารถนำแนวคิดเชิงคำนวณไปประยุกต์ใช้กับเรื่องใดได้บ้าง?",
                options: ["เฉพาะการเขียนโปรแกรมเท่านั้น", "เฉพาะวิชาคณิตศาสตร์", "เฉพาะงานวิทยาศาสตร์", "สามารถใช้ได้กับทุกเรื่องในชีวิตประจำวัน"],
                correct: 3
            }
        ];

        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;

        startQuizBtn.addEventListener('click', startQuiz);
        if (document.getElementById('restartQuizBtn')) {
            document.getElementById('restartQuizBtn').addEventListener('click', startQuiz);
        }

        if (document.getElementById('nextBtn')) {
            document.getElementById('nextBtn').addEventListener('click', nextQuestion);
        }

        function startQuiz() {
            // Reset State
            score = 0;
            currentQuestionIndex = 0;

            // Randomly select 2 unique questions
            const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
            currentQuestions = shuffled.slice(0, 2);

            // Show Question UI
            quizStart.style.display = 'none';
            quizResult.style.display = 'none';
            quizQuestion.style.display = 'block';

            showQuestion();
        }

        function showQuestion() {
            const q = currentQuestions[currentQuestionIndex];
            const qNumber = document.getElementById('qNumber');
            const qText = document.getElementById('questionText');
            const optionsGrid = document.getElementById('optionsGrid');
            const feedbackMsg = document.getElementById('feedbackMsg');
            const nextBtn = document.getElementById('nextBtn');

            qNumber.innerText = `ข้อที่ ${currentQuestionIndex + 1}/${currentQuestions.length}`;
            qText.innerText = q.text;
            document.getElementById('currentScore').innerText = `คะแนน: ${score}`;

            // Clear previous options
            optionsGrid.innerHTML = '';
            feedbackMsg.innerText = '';
            feedbackMsg.className = 'feedback-msg';
            nextBtn.style.display = 'none';

            // Create Option Buttons
            q.options.forEach((opt, index) => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option';
                btn.innerText = opt;
                btn.onclick = () => selectOption(index, q.correct, btn);
                optionsGrid.appendChild(btn);
            });
        }

        function selectOption(selectedIndex, correctIndex, btnElement) {
            // Disable all options
            const options = document.querySelectorAll('.quiz-option');
            options.forEach(opt => opt.style.pointerEvents = 'none');

            const feedbackMsg = document.getElementById('feedbackMsg');
            const nextBtn = document.getElementById('nextBtn');

            if (selectedIndex === correctIndex) {
                btnElement.classList.add('correct');
                feedbackMsg.innerText = "ถูกต้อง! เก่งมาก";
                feedbackMsg.style.color = "#2E7D32";
                score++;
            } else {
                btnElement.classList.add('incorrect');
                // Highlight correct one
                options[correctIndex].classList.add('correct');
                feedbackMsg.innerText = "ยังไม่ถูก ข้อที่ถูกต้องคือตัวเลือกสีเขียว";
                feedbackMsg.style.color = "#C62828";
            }

            document.getElementById('currentScore').innerText = `คะแนน: ${score}`;
            nextBtn.style.display = 'inline-block';

            // Change button text if last question
            if (currentQuestionIndex === currentQuestions.length - 1) {
                nextBtn.innerText = "ดูผลลัพธ์";
            } else {
                nextBtn.innerText = "ข้อถัดไป";
            }
        }

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function showResult() {
            quizQuestion.style.display = 'none';
            quizResult.style.display = 'block';
            document.getElementById('finalScoreDisplay').innerText = score;
        }
    }
});
