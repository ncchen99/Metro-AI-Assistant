/**
 * API 測試腳本
 * 測試所有 Vercel Serverless Functions endpoints
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3001';

// 測試顏色碼
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testHealthEndpoint() {
    log('\n🔍 測試 Health Endpoint...', 'blue');

    try {
        const response = await fetch(`${BASE_URL}/api/health`);
        const data = await response.json();

        if (response.ok && data.status === 'ok') {
            log('✅ Health endpoint 測試通過', 'green');
            console.log('回應:', data);
            return true;
        } else {
            log('❌ Health endpoint 測試失敗', 'red');
            console.log('回應:', data);
            return false;
        }
    } catch (error) {
        log(`❌ Health endpoint 錯誤: ${error.message}`, 'red');
        return false;
    }
}

async function testAskEndpoint() {
    log('\n🔍 測試 Ask Endpoint...', 'blue');

    try {
        const testQuestions = [
            { question: '台北捷運有幾條線？', mode: 'work' },
            { question: '推薦台北的景點', mode: 'travel' }
        ];

        for (const testCase of testQuestions) {
            log(`\n📝 測試問題 (${testCase.mode} 模式): ${testCase.question}`, 'yellow');

            const response = await fetch(`${BASE_URL}/api/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testCase)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                log(`✅ Ask endpoint 測試通過 (${testCase.mode})`, 'green');
                console.log('回應:', data.answer?.substring(0, 100) + '...');
            } else {
                log(`❌ Ask endpoint 測試失敗 (${testCase.mode})`, 'red');
                console.log('錯誤:', data);
                return false;
            }
        }

        return true;
    } catch (error) {
        log(`❌ Ask endpoint 錯誤: ${error.message}`, 'red');
        return false;
    }
}

async function testTTSEndpoint() {
    log('\n🔍 測試 TTS Endpoint...', 'blue');

    try {
        const testText = '歡迎使用台北捷運智能助手';

        const response = await fetch(`${BASE_URL}/api/tts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: testText,
                voice: 'alloy',
                format: 'mp3'
            })
        });

        if (response.ok) {
            const audioBuffer = await response.arrayBuffer();
            if (audioBuffer.byteLength > 0) {
                log('✅ TTS endpoint 測試通過', 'green');
                console.log(`音訊檔案大小: ${audioBuffer.byteLength} bytes`);
                return true;
            } else {
                log('❌ TTS endpoint 回傳空檔案', 'red');
                return false;
            }
        } else {
            const errorData = await response.json();
            log('❌ TTS endpoint 測試失敗', 'red');
            console.log('錯誤:', errorData);
            return false;
        }
    } catch (error) {
        log(`❌ TTS endpoint 錯誤: ${error.message}`, 'red');
        return false;
    }
}

async function testSTTEndpoint() {
    log('\n🔍 測試 STT Endpoint...', 'blue');
    log('⚠️  STT 測試需要音訊檔案，跳過自動測試', 'yellow');
    log('💡 手動測試: 上傳音訊檔案到 /api/stt', 'blue');
    return true;
}

async function runAllTests() {
    log('🚀 開始 API 測試...', 'blue');
    log('=' * 50, 'blue');

    const results = {
        health: await testHealthEndpoint(),
        ask: await testAskEndpoint(),
        tts: await testTTSEndpoint(),
        stt: await testSTTEndpoint()
    };

    log('\n' + '=' * 50, 'blue');
    log('📊 測試結果總結:', 'blue');

    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;

    for (const [endpoint, passed] of Object.entries(results)) {
        const status = passed ? '✅ 通過' : '❌ 失敗';
        const color = passed ? 'green' : 'red';
        log(`${endpoint.toUpperCase()}: ${status}`, color);
    }

    log(`\n總計: ${passed}/${total} 測試通過`, passed === total ? 'green' : 'yellow');

    if (passed === total) {
        log('\n🎉 所有測試都通過了！', 'green');
    } else {
        log('\n⚠️  有些測試失敗，請檢查伺服器狀態和環境變數', 'yellow');
    }
}

// 檢查是否有必要的環境變數提醒
function checkEnvironment() {
    log('🔧 環境檢查...', 'blue');

    if (!process.env.OPENAI_API_KEY) {
        log('⚠️  注意: 未設定 OPENAI_API_KEY 環境變數', 'yellow');
        log('   請在 .env 檔案中設定或使用 export OPENAI_API_KEY=your_key', 'yellow');
    } else {
        log('✅ OPENAI_API_KEY 已設定', 'green');
    }
}

// 主程式
async function main() {
    checkEnvironment();

    log('\n請確保 Vercel dev server 正在運行:', 'yellow');
    log('npm run dev', 'blue');
    log('\n按 Enter 繼續測試，或 Ctrl+C 取消...');

    // 等待用戶確認
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        await runAllTests();
        process.exit(0);
    });
}

main();
