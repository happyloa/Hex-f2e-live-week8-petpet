<template>
  <div class="grid gap-5 text-form tablet:max-w-[350px]">
    <label class="grid gap-1">
      信用卡帳號
      <input
        class="field field-small"
        inputmode="numeric"
        autocomplete="off"
        maxlength="19"
        pattern="4242[ \-]?4242[ \-]?4242[ \-]?4242"
        placeholder="Xxxx-xxxx-xxxx-xxxx"
        title="請使用示範卡號 4242 4242 4242 4242"
        aria-describedby="demo-payment-note"
      />
    </label>
    <label class="grid gap-1">
      有效日期
      <input
        class="field field-small"
        inputmode="numeric"
        autocomplete="off"
        maxlength="5"
        pattern="(0[1-9]|1[0-2])/?[0-9]{2}"
        placeholder="(MM/YY)"
        title="請輸入兩位數月份與年份，例如 1230"
        aria-describedby="demo-payment-note"
      />
    </label>
    <label class="grid gap-1">
      安全碼
      <input
        class="field field-small"
        inputmode="numeric"
        autocomplete="off"
        maxlength="3"
        pattern="123"
        placeholder="xxx"
        title="請使用示範安全碼 123"
        aria-describedby="demo-payment-note"
      />
    </label>
    <p id="demo-payment-note" class="text-sm text-muted">
      示範付款可直接繼續。若要練習輸入，請使用 4242 4242 4242 4242 和安全碼
      123。
    </p>
  </div>
</template>
