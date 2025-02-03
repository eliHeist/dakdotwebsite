<script lang="ts">
    let variableHeader: HTMLElement

    $effect(() => {
        variableHeader.style.height = `${variableHeader.firstElementChild?.clientHeight}px`
    })
</script>

<section class="fixed inset-0 grid -z-10">
    <div class="grid items-center mx-auto">
        <div class="hero-text text-[3rem] xl:text-8xl">
            <div class="one">DIGITAL</div>
            <div class="two">
                <span>SOLUTIONS</span>
                <!-- <span>DESIGN</span>
                <span>MARKETING</span> -->
            </div>
            <div class="three">AGENCY</div>
        </div>
    </div>
</section>
<div class="h-[100svh]"></div>

<style>
    
    .hero-text {
        font-weight: 100;
        line-height: 1;
        text-align: center;

        --margin: 10;
        
        & .two{
            font-weight: 800;
            /* position: relative;
            
            & span {
                position: absolute;
            } */
        }
        
        & .three{
        }
    }
</style>