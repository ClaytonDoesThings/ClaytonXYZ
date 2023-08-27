let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h08422038e95dbd34(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_37(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb31d88ce87b611b9(arg0, arg1);
}

function __wbg_adapter_52(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0ff5c0a2e9a55235(arg0, arg1);
}

function __wbg_adapter_55(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h534872ef6549f865(arg0, arg1, addHeapObject(arg2));
}

/**
*/
export function wasm_run() {
    wasm.wasm_run();
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedFloat32Memory0 = null;

function getFloat32Memory0() {
    if (cachedFloat32Memory0 === null || cachedFloat32Memory0.byteLength === 0) {
        cachedFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32Memory0;
}

function getArrayF32FromWasm0(ptr, len) {
    return getFloat32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    return getInt32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getArrayU32FromWasm0(ptr, len) {
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
function __wbg_adapter_695(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h765bd499d44075c3(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_cb_drop(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

export function __wbg_crypto_e1d53a1d73fb10b8(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export function __wbindgen_is_object(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbg_process_038c26bf42b093f8(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

export function __wbg_versions_ab37218d2f0b24a8(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

export function __wbg_node_080f4b19d15bc1fe(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

export function __wbindgen_is_string(arg0) {
    const ret = typeof(getObject(arg0)) === 'string';
    return ret;
};

export function __wbg_msCrypto_6e7d3e1f92610cbb(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

export function __wbg_require_78a3dcfbdba9cbce() { return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_is_function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

export function __wbg_getRandomValues_805f1c3d65988a5a() { return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
}, arguments) };

export function __wbg_randomFillSync_6894564c2c334c42() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
}, arguments) };

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbindgen_boolean_get(arg0) {
    const v = getObject(arg0);
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbg_instanceof_WebGl2RenderingContext_61bb2cb23346dbb7(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof WebGL2RenderingContext;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_beginQuery_fb152d8d84f2b130(arg0, arg1, arg2) {
    getObject(arg0).beginQuery(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindBufferRange_f2c529259df5358e(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).bindBufferRange(arg1 >>> 0, arg2 >>> 0, getObject(arg3), arg4, arg5);
};

export function __wbg_bindSampler_6eb88b542e5a410f(arg0, arg1, arg2) {
    getObject(arg0).bindSampler(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindVertexArray_8b71290041cb6746(arg0, arg1) {
    getObject(arg0).bindVertexArray(getObject(arg1));
};

export function __wbg_blitFramebuffer_86eee8a5763ded5e(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    getObject(arg0).blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
};

export function __wbg_bufferData_573e61c49a480c4d(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_16f948547d74c866(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
};

export function __wbg_bufferSubData_c7180c0b681078e8(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferSubData(arg1 >>> 0, arg2, getObject(arg3));
};

export function __wbg_clearBufferfi_95daf829c568e58a(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearBufferfi(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_clearBufferfv_b3c90fbed3b74920(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferiv_fe2a00a8f8fb7322(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferuiv_a41730a8d84c6ac6(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
};

export function __wbg_clientWaitSync_ae8f3712f85a57fb(arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).clientWaitSync(getObject(arg1), arg2 >>> 0, arg3 >>> 0);
    return ret;
};

export function __wbg_compressedTexSubImage2D_23b602b828848fb7(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
};

export function __wbg_compressedTexSubImage2D_d6c95fc640a9f4de(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    getObject(arg0).compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, getObject(arg8));
};

export function __wbg_compressedTexSubImage3D_00b794917e65d559(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    getObject(arg0).compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
};

export function __wbg_compressedTexSubImage3D_c9c7b42e0f7db586(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    getObject(arg0).compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, getObject(arg10));
};

export function __wbg_copyBufferSubData_c903618a0e0a9fca(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_copyTexSubImage3D_88fc9e1c56d3e7db(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

export function __wbg_createVertexArray_de7292bbd7ea02dd(arg0) {
    const ret = getObject(arg0).createVertexArray();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_deleteQuery_0981fb4d492e46a7(arg0, arg1) {
    getObject(arg0).deleteQuery(getObject(arg1));
};

export function __wbg_deleteSampler_6d832d1900eafbea(arg0, arg1) {
    getObject(arg0).deleteSampler(getObject(arg1));
};

export function __wbg_deleteSync_f8f026807b7eee54(arg0, arg1) {
    getObject(arg0).deleteSync(getObject(arg1));
};

export function __wbg_deleteVertexArray_dc4f1b2e5ac93f24(arg0, arg1) {
    getObject(arg0).deleteVertexArray(getObject(arg1));
};

export function __wbg_drawArraysInstanced_1222b6236d008088(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawBuffers_3223f0aeb44f7057(arg0, arg1) {
    getObject(arg0).drawBuffers(getObject(arg1));
};

export function __wbg_drawElementsInstanced_b4714f8dd90fd2a8(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_endQuery_726967da9d5d1ca7(arg0, arg1) {
    getObject(arg0).endQuery(arg1 >>> 0);
};

export function __wbg_fenceSync_fb3e1185847ee462(arg0, arg1, arg2) {
    const ret = getObject(arg0).fenceSync(arg1 >>> 0, arg2 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_framebufferTextureLayer_e644333b8ec36f9d(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, getObject(arg3), arg4, arg5);
};

export function __wbg_getBufferSubData_cd8138c86821bca3(arg0, arg1, arg2, arg3) {
    getObject(arg0).getBufferSubData(arg1 >>> 0, arg2, getObject(arg3));
};

export function __wbg_getIndexedParameter_5f5c79f6c05edd18() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
}, arguments) };

export function __wbg_getQueryParameter_e0f43fb85f793bbe(arg0, arg1, arg2) {
    const ret = getObject(arg0).getQueryParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getSyncParameter_b2f55318719e958c(arg0, arg1, arg2) {
    const ret = getObject(arg0).getSyncParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getUniformBlockIndex_a05b0c144aa49817(arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).getUniformBlockIndex(getObject(arg1), getStringFromWasm0(arg2, arg3));
    return ret;
};

export function __wbg_invalidateFramebuffer_696c3c456c34a207() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).invalidateFramebuffer(arg1 >>> 0, getObject(arg2));
}, arguments) };

export function __wbg_readBuffer_bade27c1171e00cf(arg0, arg1) {
    getObject(arg0).readBuffer(arg1 >>> 0);
};

export function __wbg_readPixels_493558abd28a3b61() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    getObject(arg0).readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
}, arguments) };

export function __wbg_readPixels_92102ee9fe1c81a0() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    getObject(arg0).readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_renderbufferStorageMultisample_9cb173d2fd461513(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_texStorage2D_89c29252632da923(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_texStorage3D_3897fb6b91eb82d8(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
};

export function __wbg_texSubImage2D_6a8b0f3381d734c3() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
}, arguments) };

export function __wbg_texSubImage2D_53b6a050a0b9b24e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage3D_84ef903e11598af0() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    getObject(arg0).texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_1d82135e9ce965bf() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    getObject(arg0).texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, getObject(arg11));
}, arguments) };

export function __wbg_uniform2fv_ffd0b1d3c3a4070a(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_32329f9a4d491136(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2iv(getObject(arg1), getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_bc831e48acb2c057(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform3fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_100a284f5a3cbca5(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform3iv(getObject(arg1), getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4fv_26d822da5c3fdb00(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform4fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_7f03c41e6e49bbd6(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform4iv(getObject(arg1), getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniformBlockBinding_1971f4528d9c3043(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniformBlockBinding(getObject(arg1), arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_uniformMatrix2fv_5f1f56c7cbfb533f(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).uniformMatrix2fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_ae9271db8127a57b(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).uniformMatrix3fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_0f42d678a568ded9(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).uniformMatrix4fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_vertexAttribDivisor_77f020121066a4d9(arg0, arg1, arg2) {
    getObject(arg0).vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_vertexAttribIPointer_b15ad1437a268cf5(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_activeTexture_0daf7c1698e49f00(arg0, arg1) {
    getObject(arg0).activeTexture(arg1 >>> 0);
};

export function __wbg_attachShader_3038234860d2d59d(arg0, arg1, arg2) {
    getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
};

export function __wbg_bindBuffer_9cb064991696b79f(arg0, arg1, arg2) {
    getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindFramebuffer_0522db2a250c29f0(arg0, arg1, arg2) {
    getObject(arg0).bindFramebuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindRenderbuffer_1e4928d9bf839c02(arg0, arg1, arg2) {
    getObject(arg0).bindRenderbuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindTexture_0c284b1604ba527c(arg0, arg1, arg2) {
    getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
};

export function __wbg_blendColor_a17ddceb3534e0b3(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendEquation_b5d5be767bd3835a(arg0, arg1) {
    getObject(arg0).blendEquation(arg1 >>> 0);
};

export function __wbg_blendEquationSeparate_d2fa3b718ee3579f(arg0, arg1, arg2) {
    getObject(arg0).blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFunc_d456b0c766f8dbc9(arg0, arg1, arg2) {
    getObject(arg0).blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFuncSeparate_9a7146974b3cd76d(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_colorMask_a7f067283ed312c9(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_compileShader_af777dd3b15798b3(arg0, arg1) {
    getObject(arg0).compileShader(getObject(arg1));
};

export function __wbg_copyTexSubImage2D_47b14ff8459fd4c8(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    getObject(arg0).copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_createBuffer_5ed0554ab35780b5(arg0) {
    const ret = getObject(arg0).createBuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createFramebuffer_86883935c13ddd59(arg0) {
    const ret = getObject(arg0).createFramebuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createProgram_7d25c1dd3bb0ce39(arg0) {
    const ret = getObject(arg0).createProgram();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createRenderbuffer_b392324e044d389a(arg0) {
    const ret = getObject(arg0).createRenderbuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createShader_96339db58713e350(arg0, arg1) {
    const ret = getObject(arg0).createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createTexture_c651f9e28d1ce9d2(arg0) {
    const ret = getObject(arg0).createTexture();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_cullFace_79e4ddbea13278b3(arg0, arg1) {
    getObject(arg0).cullFace(arg1 >>> 0);
};

export function __wbg_deleteBuffer_cf67a696a7857b3f(arg0, arg1) {
    getObject(arg0).deleteBuffer(getObject(arg1));
};

export function __wbg_deleteFramebuffer_f9c2bceeb5422d9d(arg0, arg1) {
    getObject(arg0).deleteFramebuffer(getObject(arg1));
};

export function __wbg_deleteProgram_9c8fa1ef341cb01d(arg0, arg1) {
    getObject(arg0).deleteProgram(getObject(arg1));
};

export function __wbg_deleteRenderbuffer_cad502ac8d1398f2(arg0, arg1) {
    getObject(arg0).deleteRenderbuffer(getObject(arg1));
};

export function __wbg_deleteShader_f48f72524f5ee3ed(arg0, arg1) {
    getObject(arg0).deleteShader(getObject(arg1));
};

export function __wbg_deleteTexture_1b5f5e536e0d5545(arg0, arg1) {
    getObject(arg0).deleteTexture(getObject(arg1));
};

export function __wbg_depthFunc_2060ec3687ac1f95(arg0, arg1) {
    getObject(arg0).depthFunc(arg1 >>> 0);
};

export function __wbg_depthMask_27d367443a80541d(arg0, arg1) {
    getObject(arg0).depthMask(arg1 !== 0);
};

export function __wbg_depthRange_7109c2393819a37b(arg0, arg1, arg2) {
    getObject(arg0).depthRange(arg1, arg2);
};

export function __wbg_disable_3adb8645ea1d92d4(arg0, arg1) {
    getObject(arg0).disable(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_f469283fda607cee(arg0, arg1) {
    getObject(arg0).disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_drawArrays_84de8a2416396807(arg0, arg1, arg2, arg3) {
    getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawElements_dcb8df9c52e2bbd5(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
};

export function __wbg_enable_1ac9f14a577b7c8b(arg0, arg1) {
    getObject(arg0).enable(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_53139716d9c95dba(arg0, arg1) {
    getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_framebufferRenderbuffer_77bdb2f359a5728f(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
};

export function __wbg_framebufferTexture2D_885176f16a153fec(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
};

export function __wbg_frontFace_3d7784c56ffede8a(arg0, arg1) {
    getObject(arg0).frontFace(arg1 >>> 0);
};

export function __wbg_getActiveUniform_9c4ac7c1ccf5f894(arg0, arg1, arg2) {
    const ret = getObject(arg0).getActiveUniform(getObject(arg1), arg2 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_getExtension_f0070583175271d4() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_getParameter_56d47f9b55e463d4() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).getParameter(arg1 >>> 0);
    return addHeapObject(ret);
}, arguments) };

export function __wbg_getProgramInfoLog_7654794297967ac0(arg0, arg1, arg2) {
    const ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_getProgramParameter_5b1a40917aa850f8(arg0, arg1, arg2) {
    const ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getShaderInfoLog_915d0e8506c11159(arg0, arg1, arg2) {
    const ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_getShaderParameter_f9240892c9e7a0a3(arg0, arg1, arg2) {
    const ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getSupportedExtensions_7af8f7bbdd4d7b2c(arg0) {
    const ret = getObject(arg0).getSupportedExtensions();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_getUniformLocation_c6caabb349b43da7(arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_linkProgram_2d5cc584654696b8(arg0, arg1) {
    getObject(arg0).linkProgram(getObject(arg1));
};

export function __wbg_pixelStorei_a0b83efc92cd29fe(arg0, arg1, arg2) {
    getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_polygonOffset_03d3955d5a1afa08(arg0, arg1, arg2) {
    getObject(arg0).polygonOffset(arg1, arg2);
};

export function __wbg_renderbufferStorage_2192d9cd09128339(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_scissor_2b084e0dc81d67f4(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_shaderSource_57883245cdfb0dca(arg0, arg1, arg2, arg3) {
    getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
};

export function __wbg_stencilFuncSeparate_3be68afd7ca6efcc(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilMask_144b86d15d9fdbe6(arg0, arg1) {
    getObject(arg0).stencilMask(arg1 >>> 0);
};

export function __wbg_stencilMaskSeparate_84a2494b967772c7(arg0, arg1, arg2) {
    getObject(arg0).stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilOpSeparate_1708aea1aea0dc48(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_texParameteri_e0ce3810261e0864(arg0, arg1, arg2, arg3) {
    getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_uniform1f_dcc6951bde745417(arg0, arg1, arg2) {
    getObject(arg0).uniform1f(getObject(arg1), arg2);
};

export function __wbg_uniform1i_4fdc6d6740375d22(arg0, arg1, arg2) {
    getObject(arg0).uniform1i(getObject(arg1), arg2);
};

export function __wbg_uniform4f_19b349303edb7836(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).uniform4f(getObject(arg1), arg2, arg3, arg4, arg5);
};

export function __wbg_useProgram_2f4094faf45ecba1(arg0, arg1) {
    getObject(arg0).useProgram(getObject(arg1));
};

export function __wbg_vertexAttribPointer_ad370785358334f4(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_viewport_cc41e28a71c23915(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_instanceof_Window_e266f02eee43b570(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Window;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_document_950215a728589a2d(arg0) {
    const ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_innerWidth_7e9d12e05bcb598e() { return handleError(function (arg0) {
    const ret = getObject(arg0).innerWidth;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_innerHeight_3ef25a30618357e0() { return handleError(function (arg0) {
    const ret = getObject(arg0).innerHeight;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_devicePixelRatio_5f8f5cab76864090(arg0) {
    const ret = getObject(arg0).devicePixelRatio;
    return ret;
};

export function __wbg_cancelAnimationFrame_d079cdb83bc43b26() { return handleError(function (arg0, arg1) {
    getObject(arg0).cancelAnimationFrame(arg1);
}, arguments) };

export function __wbg_matchMedia_967e50e4289050fa() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).matchMedia(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_requestAnimationFrame_afe426b568f84138() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
    return ret;
}, arguments) };

export function __wbg_get_e6ae480a4b8df368(arg0, arg1, arg2) {
    const ret = getObject(arg0)[getStringFromWasm0(arg1, arg2)];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_clearTimeout_b2b8af0f044e02e9(arg0, arg1) {
    getObject(arg0).clearTimeout(arg1);
};

export function __wbg_setTimeout_6609c9aa64f32bfc() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
    return ret;
}, arguments) };

export function __wbg_clientX_35f23f953e04ec0e(arg0) {
    const ret = getObject(arg0).clientX;
    return ret;
};

export function __wbg_clientY_8104e462abc0b3ec(arg0) {
    const ret = getObject(arg0).clientY;
    return ret;
};

export function __wbg_offsetX_413d9f02022e72ad(arg0) {
    const ret = getObject(arg0).offsetX;
    return ret;
};

export function __wbg_offsetY_488f80a0a9666028(arg0) {
    const ret = getObject(arg0).offsetY;
    return ret;
};

export function __wbg_ctrlKey_e1b8f1de1eb24d5d(arg0) {
    const ret = getObject(arg0).ctrlKey;
    return ret;
};

export function __wbg_shiftKey_fdd99b6df96e25c5(arg0) {
    const ret = getObject(arg0).shiftKey;
    return ret;
};

export function __wbg_altKey_d531a4d3704557cb(arg0) {
    const ret = getObject(arg0).altKey;
    return ret;
};

export function __wbg_metaKey_934772989e28020c(arg0) {
    const ret = getObject(arg0).metaKey;
    return ret;
};

export function __wbg_button_a1c470d5e4c997f2(arg0) {
    const ret = getObject(arg0).button;
    return ret;
};

export function __wbg_buttons_42a7b7de33d8e572(arg0) {
    const ret = getObject(arg0).buttons;
    return ret;
};

export function __wbg_movementX_f4d07f6658c1e16f(arg0) {
    const ret = getObject(arg0).movementX;
    return ret;
};

export function __wbg_movementY_30276c1f90aec4fa(arg0) {
    const ret = getObject(arg0).movementY;
    return ret;
};

export function __wbg_charCode_504e79c3e550d1bb(arg0) {
    const ret = getObject(arg0).charCode;
    return ret;
};

export function __wbg_keyCode_b33194be2ceec53b(arg0) {
    const ret = getObject(arg0).keyCode;
    return ret;
};

export function __wbg_altKey_dff2a075455ac01b(arg0) {
    const ret = getObject(arg0).altKey;
    return ret;
};

export function __wbg_ctrlKey_993b558f853d64ce(arg0) {
    const ret = getObject(arg0).ctrlKey;
    return ret;
};

export function __wbg_shiftKey_31e62e9d172b26f0(arg0) {
    const ret = getObject(arg0).shiftKey;
    return ret;
};

export function __wbg_metaKey_9f0f19692d0498bd(arg0) {
    const ret = getObject(arg0).metaKey;
    return ret;
};

export function __wbg_key_f0decac219aa904b(arg0, arg1) {
    const ret = getObject(arg1).key;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_code_aed21120de275a12(arg0, arg1) {
    const ret = getObject(arg1).code;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_getModifierState_03b72700dbe33ad6(arg0, arg1, arg2) {
    const ret = getObject(arg0).getModifierState(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_setProperty_21e2e7868b86a93e() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_matches_7b5ad9e6bb56f1f3(arg0) {
    const ret = getObject(arg0).matches;
    return ret;
};

export function __wbg_addListener_dfc3f9e430149b14() { return handleError(function (arg0, arg1) {
    getObject(arg0).addListener(getObject(arg1));
}, arguments) };

export function __wbg_removeListener_6f811d2fb59768b9() { return handleError(function (arg0, arg1) {
    getObject(arg0).removeListener(getObject(arg1));
}, arguments) };

export function __wbg_size_5ce324b99223d189(arg0) {
    const ret = getObject(arg0).size;
    return ret;
};

export function __wbg_type_979610383a4b7c57(arg0) {
    const ret = getObject(arg0).type;
    return ret;
};

export function __wbg_name_1e6651aff4fe7a88(arg0, arg1) {
    const ret = getObject(arg1).name;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_target_b629c177f9bee3da(arg0) {
    const ret = getObject(arg0).target;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_cancelBubble_c9a8182589205d54(arg0) {
    const ret = getObject(arg0).cancelBubble;
    return ret;
};

export function __wbg_preventDefault_16b2170b12f56317(arg0) {
    getObject(arg0).preventDefault();
};

export function __wbg_stopPropagation_7647c9985222f9b0(arg0) {
    getObject(arg0).stopPropagation();
};

export function __wbg_addEventListener_615d4590d38da1c9() { return handleError(function (arg0, arg1, arg2, arg3) {
    getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
}, arguments) };

export function __wbg_addEventListener_cf5b03cd29763277() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
}, arguments) };

export function __wbg_removeEventListener_86fd19ed073cd1ed() { return handleError(function (arg0, arg1, arg2, arg3) {
    getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
}, arguments) };

export function __wbg_appendChild_b8199dc1655c852d() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).appendChild(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_instanceof_HtmlButtonElement_7046caffb25a7bfb(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof HTMLButtonElement;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_x_0938e87a3ff14a2e(arg0) {
    const ret = getObject(arg0).x;
    return ret;
};

export function __wbg_y_b881176a43492948(arg0) {
    const ret = getObject(arg0).y;
    return ret;
};

export function __wbg_length_e330009c21d43b27(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

export function __wbg_get_460ba3644fab1c42(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_body_be46234bb33edd63(arg0) {
    const ret = getObject(arg0).body;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_fullscreenElement_65f14a4df7c25129(arg0) {
    const ret = getObject(arg0).fullscreenElement;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createElement_e2a0e21263eb5416() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_exitFullscreen_36506b10bd87f8b8(arg0) {
    getObject(arg0).exitFullscreen();
};

export function __wbg_querySelector_32b9d7ebb2df951d() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_setid_3ffcf3ad6af1d07c(arg0, arg1, arg2) {
    getObject(arg0).id = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setinnerHTML_76167cda24d9b96b(arg0, arg1, arg2) {
    getObject(arg0).innerHTML = getStringFromWasm0(arg1, arg2);
};

export function __wbg_getBoundingClientRect_aaa701cbcb448965(arg0) {
    const ret = getObject(arg0).getBoundingClientRect();
    return addHeapObject(ret);
};

export function __wbg_requestFullscreen_4eee04b9090fa98a() { return handleError(function (arg0) {
    getObject(arg0).requestFullscreen();
}, arguments) };

export function __wbg_setAttribute_79c9562d32d05e66() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setPointerCapture_5479dc0d082282b7() { return handleError(function (arg0, arg1) {
    getObject(arg0).setPointerCapture(arg1);
}, arguments) };

export function __wbg_remove_b18bc815630b67ec(arg0) {
    getObject(arg0).remove();
};

export function __wbg_setinnerText_3dfcf413b5b5621c(arg0, arg1, arg2) {
    getObject(arg0).innerText = getStringFromWasm0(arg1, arg2);
};

export function __wbg_style_2141664e428fef46(arg0) {
    const ret = getObject(arg0).style;
    return addHeapObject(ret);
};

export function __wbg_setonclick_b071a249a715a0cf(arg0, arg1) {
    getObject(arg0).onclick = getObject(arg1);
};

export function __wbg_bufferData_05664df801d7aec0(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_023700b2ed207c43(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
};

export function __wbg_bufferSubData_4e653f611d7a962d(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferSubData(arg1 >>> 0, arg2, getObject(arg3));
};

export function __wbg_compressedTexSubImage2D_788296e97b316838(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    getObject(arg0).compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, getObject(arg8));
};

export function __wbg_readPixels_30de7174c15126d3() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    getObject(arg0).readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
}, arguments) };

export function __wbg_texSubImage2D_57792696288b0a61() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
}, arguments) };

export function __wbg_uniform2fv_c29ce786946f1aae(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_58c3d5ee9e70c71d(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2iv(getObject(arg1), getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_5ca48b3279e0c643(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform3fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_0a103fe131bd9213(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform3iv(getObject(arg1), getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4fv_14f1c5ef10bfb4c9(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform4fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_9436eeda2a27cce8(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform4iv(getObject(arg1), getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniformMatrix2fv_1a40e9f63b2005c8(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).uniformMatrix2fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_dcde28ba8c34d30e(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).uniformMatrix3fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_4575a018c8188146(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).uniformMatrix4fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_activeTexture_01d5469eb22c10e7(arg0, arg1) {
    getObject(arg0).activeTexture(arg1 >>> 0);
};

export function __wbg_attachShader_14fb12e2ae589dc3(arg0, arg1, arg2) {
    getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
};

export function __wbg_bindBuffer_b7c382dcd70e33f6(arg0, arg1, arg2) {
    getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindFramebuffer_a5ab0ed0463586cb(arg0, arg1, arg2) {
    getObject(arg0).bindFramebuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindRenderbuffer_2d67c879cdbe5ea9(arg0, arg1, arg2) {
    getObject(arg0).bindRenderbuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindTexture_c1c0e00507424f8e(arg0, arg1, arg2) {
    getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
};

export function __wbg_blendColor_13739d87434b79c3(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendEquation_562c3267161e4675(arg0, arg1) {
    getObject(arg0).blendEquation(arg1 >>> 0);
};

export function __wbg_blendEquationSeparate_48b95e78f7224be4(arg0, arg1, arg2) {
    getObject(arg0).blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFunc_f4365f78b650180f(arg0, arg1, arg2) {
    getObject(arg0).blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFuncSeparate_b508053691b6ebbe(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_colorMask_99120a2c8caf1298(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_compileShader_4e9130ccbd4a0238(arg0, arg1) {
    getObject(arg0).compileShader(getObject(arg1));
};

export function __wbg_copyTexSubImage2D_7c0b0080eece3c1a(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    getObject(arg0).copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_createBuffer_8c64250e5283611c(arg0) {
    const ret = getObject(arg0).createBuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createFramebuffer_1f943a32c748753e(arg0) {
    const ret = getObject(arg0).createFramebuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createProgram_28db0ff3cee5f71a(arg0) {
    const ret = getObject(arg0).createProgram();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createRenderbuffer_a76dcfda7bdc749a(arg0) {
    const ret = getObject(arg0).createRenderbuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createShader_c5fcd8592f47b510(arg0, arg1) {
    const ret = getObject(arg0).createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createTexture_81fd93af28301e0e(arg0) {
    const ret = getObject(arg0).createTexture();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_cullFace_d4450f8718c6b3eb(arg0, arg1) {
    getObject(arg0).cullFace(arg1 >>> 0);
};

export function __wbg_deleteBuffer_17feed38f3a70ec9(arg0, arg1) {
    getObject(arg0).deleteBuffer(getObject(arg1));
};

export function __wbg_deleteFramebuffer_130abca01c89b7d6(arg0, arg1) {
    getObject(arg0).deleteFramebuffer(getObject(arg1));
};

export function __wbg_deleteProgram_dd5f0e2bc555e270(arg0, arg1) {
    getObject(arg0).deleteProgram(getObject(arg1));
};

export function __wbg_deleteRenderbuffer_385f3c9e8759b99e(arg0, arg1) {
    getObject(arg0).deleteRenderbuffer(getObject(arg1));
};

export function __wbg_deleteShader_fac9fb3cdefdf6ec(arg0, arg1) {
    getObject(arg0).deleteShader(getObject(arg1));
};

export function __wbg_deleteTexture_605a36a7e380df5f(arg0, arg1) {
    getObject(arg0).deleteTexture(getObject(arg1));
};

export function __wbg_depthFunc_00d8a905436dc681(arg0, arg1) {
    getObject(arg0).depthFunc(arg1 >>> 0);
};

export function __wbg_depthMask_134f9e3073ca4fd0(arg0, arg1) {
    getObject(arg0).depthMask(arg1 !== 0);
};

export function __wbg_depthRange_f34f19edea1feadd(arg0, arg1, arg2) {
    getObject(arg0).depthRange(arg1, arg2);
};

export function __wbg_disable_65425605098b79cf(arg0, arg1) {
    getObject(arg0).disable(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_cf25f8beb5872364(arg0, arg1) {
    getObject(arg0).disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_drawArrays_e5fa3cfc2b5d7c6d(arg0, arg1, arg2, arg3) {
    getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawElements_a388832eba137ef0(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
};

export function __wbg_enable_2c3b6a4692af9b1b(arg0, arg1) {
    getObject(arg0).enable(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_6dd3d0668209ae19(arg0, arg1) {
    getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_framebufferRenderbuffer_3bf1420713a0b21a(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
};

export function __wbg_framebufferTexture2D_ed03c0674b9979ce(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
};

export function __wbg_frontFace_00177185d2fae697(arg0, arg1) {
    getObject(arg0).frontFace(arg1 >>> 0);
};

export function __wbg_getActiveUniform_e49dcda694ae15ab(arg0, arg1, arg2) {
    const ret = getObject(arg0).getActiveUniform(getObject(arg1), arg2 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_getParameter_d6cd2dd2cde656ec() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).getParameter(arg1 >>> 0);
    return addHeapObject(ret);
}, arguments) };

export function __wbg_getProgramInfoLog_7fd2a7c6c1a280c1(arg0, arg1, arg2) {
    const ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_getProgramParameter_af1cfcccbbc80f71(arg0, arg1, arg2) {
    const ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getShaderInfoLog_d057293074e59c61(arg0, arg1, arg2) {
    const ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_getShaderParameter_685d7d7092c6bae6(arg0, arg1, arg2) {
    const ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getUniformLocation_b46e5db76599a918(arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_linkProgram_ca9df3fba2fd4125(arg0, arg1) {
    getObject(arg0).linkProgram(getObject(arg1));
};

export function __wbg_pixelStorei_f97b971917582269(arg0, arg1, arg2) {
    getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_polygonOffset_fb73618b77fd3f6f(arg0, arg1, arg2) {
    getObject(arg0).polygonOffset(arg1, arg2);
};

export function __wbg_renderbufferStorage_37eab84be1494aef(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_scissor_8bc2e761846f53f0(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_shaderSource_457e8bc42050401d(arg0, arg1, arg2, arg3) {
    getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
};

export function __wbg_stencilFuncSeparate_510d3287542b4574(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilMask_e1887eeaabe22771(arg0, arg1) {
    getObject(arg0).stencilMask(arg1 >>> 0);
};

export function __wbg_stencilMaskSeparate_e89abefeb5641657(arg0, arg1, arg2) {
    getObject(arg0).stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilOpSeparate_aa3d09aa448a6f48(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_texParameteri_9fbb09bbf9670af4(arg0, arg1, arg2, arg3) {
    getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_uniform1f_062c683ec584f7e8(arg0, arg1, arg2) {
    getObject(arg0).uniform1f(getObject(arg1), arg2);
};

export function __wbg_uniform1i_1f8256271b54cf41(arg0, arg1, arg2) {
    getObject(arg0).uniform1i(getObject(arg1), arg2);
};

export function __wbg_uniform4f_68fac972655f5359(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).uniform4f(getObject(arg1), arg2, arg3, arg4, arg5);
};

export function __wbg_useProgram_6c9019d05fb8d280(arg0, arg1) {
    getObject(arg0).useProgram(getObject(arg1));
};

export function __wbg_vertexAttribPointer_ccabef9be68fe1c4(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_viewport_4bdfc4b8959593ee(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_instanceof_HtmlInputElement_5c9d54338207f061(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof HTMLInputElement;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_setaccept_bbb6b24109c6e23e(arg0, arg1, arg2) {
    getObject(arg0).accept = getStringFromWasm0(arg1, arg2);
};

export function __wbg_files_e7db01553b30ef33(arg0) {
    const ret = getObject(arg0).files;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_setmultiple_4d4b3f7ea2ce0e77(arg0, arg1) {
    getObject(arg0).multiple = arg1 !== 0;
};

export function __wbg_settype_ddc985428a794449(arg0, arg1, arg2) {
    getObject(arg0).type = getStringFromWasm0(arg1, arg2);
};

export function __wbg_error_2d344a50ccf38b3b(arg0, arg1) {
    console.error(getObject(arg0), getObject(arg1));
};

export function __wbg_matches_46e979ff3e4d0811(arg0) {
    const ret = getObject(arg0).matches;
    return ret;
};

export function __wbg_bindVertexArrayOES_688eba003a98a0bb(arg0, arg1) {
    getObject(arg0).bindVertexArrayOES(getObject(arg1));
};

export function __wbg_createVertexArrayOES_02cfe655604046eb(arg0) {
    const ret = getObject(arg0).createVertexArrayOES();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_deleteVertexArrayOES_ba22911f739464a7(arg0, arg1) {
    getObject(arg0).deleteVertexArrayOES(getObject(arg1));
};

export function __wbg_pointerId_d2caae4465ba386f(arg0) {
    const ret = getObject(arg0).pointerId;
    return ret;
};

export function __wbg_deltaX_b7d127c94d6265c0(arg0) {
    const ret = getObject(arg0).deltaX;
    return ret;
};

export function __wbg_deltaY_b32fa858e16edcc0(arg0) {
    const ret = getObject(arg0).deltaY;
    return ret;
};

export function __wbg_deltaMode_11f7b19e64d9a515(arg0) {
    const ret = getObject(arg0).deltaMode;
    return ret;
};

export function __wbg_drawArraysInstancedANGLE_403faa11d52ccf6d(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawElementsInstancedANGLE_0230afc27cf9cec9(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_vertexAttribDivisorANGLE_6bbb3df4c6e7d08b(arg0, arg1, arg2) {
    getObject(arg0).vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_result_4c6690478b5532e4() { return handleError(function (arg0) {
    const ret = getObject(arg0).result;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_setonload_14ae8c68b7ee43ee(arg0, arg1) {
    getObject(arg0).onload = getObject(arg1);
};

export function __wbg_new_8eef8a8754c6aae7() { return handleError(function () {
    const ret = new FileReader();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_readAsArrayBuffer_bc9f4aff6d3e1bb1() { return handleError(function (arg0, arg1) {
    getObject(arg0).readAsArrayBuffer(getObject(arg1));
}, arguments) };

export function __wbg_instanceof_HtmlCanvasElement_f5f69dab93281ebe(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof HTMLCanvasElement;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_width_a40e21a22129b197(arg0) {
    const ret = getObject(arg0).width;
    return ret;
};

export function __wbg_setwidth_81c62bc806e0a727(arg0, arg1) {
    getObject(arg0).width = arg1 >>> 0;
};

export function __wbg_height_98d51321254345a5(arg0) {
    const ret = getObject(arg0).height;
    return ret;
};

export function __wbg_setheight_98cf0db22c40ef07(arg0, arg1) {
    getObject(arg0).height = arg1 >>> 0;
};

export function __wbg_getContext_89a318b610dc5fd4() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2), getObject(arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_now_c644db5194be8437(arg0) {
    const ret = getObject(arg0).now();
    return ret;
};

export function __wbg_drawBuffersWEBGL_dfb0d803ea7ebe07(arg0, arg1) {
    getObject(arg0).drawBuffersWEBGL(getObject(arg1));
};

export function __wbg_get_27fe3dac1c4d0224(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
};

export function __wbg_length_e498fbc24f9c1d4f(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

export function __wbg_new_b525de17f44a8943() {
    const ret = new Array();
    return addHeapObject(ret);
};

export function __wbg_newnoargs_2b8b6bd7753c76ba(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbg_get_baf4855f9a986186() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_call_95d1ea488d03e4e8() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_new_f9876326328f45ed() {
    const ret = new Object();
    return addHeapObject(ret);
};

export function __wbg_self_e7c1f827057f6584() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_window_a09ec664e14b1b81() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_globalThis_87cbb8506fecf3a9() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_global_c85a9259e621f3db() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbg_of_892d7838f8e4cc20(arg0) {
    const ret = Array.of(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_push_49c286f04dd3bf59(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

export function __wbg_call_9495de66fdbe016b() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_getTime_7c59072d1651a3cf(arg0) {
    const ret = getObject(arg0).getTime();
    return ret;
};

export function __wbg_getTimezoneOffset_2a6b27fb18493a56(arg0) {
    const ret = getObject(arg0).getTimezoneOffset();
    return ret;
};

export function __wbg_new0_25059e40b1c02766() {
    const ret = new Date();
    return addHeapObject(ret);
};

export function __wbg_is_8f1618fe9a4fd388(arg0, arg1) {
    const ret = Object.is(getObject(arg0), getObject(arg1));
    return ret;
};

export function __wbg_new_9d3a9ce4282a18a8(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_695(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_then_f753623316e2873a(arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

export function __wbg_buffer_cf65c07de34b9a08(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_55f9ffb569d9fa74(arg0, arg1, arg2) {
    const ret = new Int8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_f477e654086cbbb6(arg0, arg1, arg2) {
    const ret = new Int16Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_b57a602974d4b1cd(arg0, arg1, arg2) {
    const ret = new Int32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_9fb2f11355ecadf5(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_new_537b7341ce90bb31(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_set_17499e8aa4003ebd(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

export function __wbg_length_27a2afe8ab42b09f(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_9241d9d251418ebf(arg0, arg1, arg2) {
    const ret = new Uint16Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_5c5a6e21987c3bee(arg0, arg1, arg2) {
    const ret = new Uint32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_4078d56428eb2926(arg0, arg1, arg2) {
    const ret = new Float32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_newwithlength_b56c882b57805732(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_subarray_7526649b91a252a6(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_set_6aa458a4ebdb65cb() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
}, arguments) };

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper431(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper433(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper435(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_37);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper437(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper439(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper441(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper443(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper445(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper447(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper1855(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 518, __wbg_adapter_52);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper1873(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 528, __wbg_adapter_55);
    return addHeapObject(ret);
};

