<template>
    <div>
        asd
    </div>
</template>
<script>
import {getFundAccount} from "../../../service/clientAPI"
export default {
    methods: {
        async getFundAccountData () {
            let msg = await getFundAccount();
            if (msg) {
                console.log(msg)
            }
        }
    },
}
</script>