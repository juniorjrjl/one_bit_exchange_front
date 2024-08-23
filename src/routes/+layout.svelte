<script lang="ts">
    import { Container, Row, Col } from '@sveltestrap/sveltestrap';
</script>

<Container>
    <Row class="main">
        <Col lg={{ size: 4, offset: 1}} md={{ size: 4, offset: 1}} class="exchange_box d-none d-md-block">
            <Row>
                <slot />
            </Row>
        </Col>
        <Col lg={{ size: 6, offset: 1}} class="title-box">
            <Row>
                <h2 class="subtitle">Converta facilmente suas Moedas</h2>
            </Row>
            <Row>
                <h3 class="subtitle">Para qualquer moeda no Mundo!</h3>
            </Row>
        </Col>
    </Row>
</Container>
