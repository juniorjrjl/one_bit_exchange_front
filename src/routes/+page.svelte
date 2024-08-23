<script lang="ts">
    import { Row, Col, Button, Form, FormGroup, Input, Card, CardBody, CardFooter, CardHeader, Spinner } from '@sveltestrap/sveltestrap';
    import exchangeService, { type AvailableResponse } from '../services/exchangeService';
    import { onMount } from 'svelte';

    let targetOptions: AvailableResponse[] = []
    let selectedTarget: AvailableResponse | null = null;
    let sourceOptions: AvailableResponse[] = []
    let selectedSource: AvailableResponse | null= null;
    let amount = '';
    let result = '';

    onMount(async () => {
        try{
            const res = await exchangeService.available();
            targetOptions = res.data;
            sourceOptions = res.data;
        }catch(err){
            console.error(err)
        }
    })

    const formatCurrency = (event: Event) => {
        if (!event) return;

        const target = event.target as HTMLInputElement;
        if (!target) return;

        const input = target.value.replace(/[^0-9,.]/g, '');
        const parts = input.split(',');

        if (parts.length > 2) {
            amount = `${parts[0]},${parts[1]}`;
            return;
        }
        amount = input;
    }

    const convertClick = async (event: Event) => {
        try{
            const amountNumber = +(amount.replace(",", "."));
            if (!selectedTarget) return;

            const target = selectedTarget.symbol;
            if (!selectedSource) return;

            const source = selectedSource.symbol;
            const res = await exchangeService.convert(source, target, amountNumber);
            result = res.data.value.toString().replace(".", ",")
        } catch (err) {
            console.error(err)
        }
    }

    const invertSelectionsClick = (event: Event) => {
        const storedSelection = selectedSource;
        selectedSource = selectedTarget;
        selectedTarget = storedSelection;
    }

    const fieldsIsValid = (target: AvailableResponse | null, source: AvailableResponse | null, amount: string) => 
        target && source && !isNaN(parseFloat(amount.replace(",", ".")));

</script>

<Col sm={{ size: 12 }} class="exchange_box">
    <Card>
        <CardHeader class="text-center">
            <Col sm={{ size: 12 }}>
                <img src="/img/logo.png" alt="logo" />
            </Col>
            <Col sm={{ size: 12 }}>
                Simule sua conversão
            </Col>
        </CardHeader>
        <CardBody>
            <div class="local_currency">
                <FormGroup>
                    <p class="title">Moeda local</p>
                    <Input type="select" class="form-control" bind:value={selectedSource} >
                        <option selected value={null}></option>
                        {#each sourceOptions as option}
                            <option value={option}>{option.description}</option>
                        {/each}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="text" placeholder="Quantidade" bind:value={amount} on:input={formatCurrency}/>
                </FormGroup>
            </div>
            <div class='destination_currency'>
                <FormGroup>
                    <p class="title">Moeda Pretendida</p>
                    <Input type="select" class="form-control" bind:value={selectedTarget} >
                        <option selected value={null}></option>
                        {#each targetOptions as option}
                            <option value={option}>{option.description}</option>
                        {/each}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="text" placeholder="Resultado" bind:value={result} readonly/>
                </FormGroup>
            </div>
            <CardFooter>
            <Row>
                <Col md={{ size: 2 }}></Col>
                <Col md={{ size: 4 }}>
                    <Button color="primary" on:click={convertClick} disabled='{!fieldsIsValid(selectedTarget, selectedSource, amount)}'>Converter</Button>
                </Col>
                <Col md={{ size: 1 }}></Col>
                <Col md={{ size: 4 }}>
                    <Button color="primary" on:click={invertSelectionsClick}>Trocar</Button>
                </Col>
                <Col md={{ size: 1 }}></Col>
            </Row>
            </CardFooter>
        </CardBody>
    </Card>
</Col>

