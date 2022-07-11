<template>
	<div class="card-container blue-container overflow-hidden">
		<div class="flex">
			<div class="px-5 ">

				<h5>Vertical</h5>
				<Menu :model="items" />

			</div>
			<div class="px-5 ">
				<div class="contact">
					<div>
						<h5>Basic</h5>
						<Dropdown v-model="selectedCity1" :options="cities" optionLabel="name" optionValue="code"
							placeholder="Select a City" />

						<h5>Editable</h5>
						<Dropdown v-model="selectedCity2" :options="cities" optionLabel="name" :editable="true" />

						<h5>Grouped</h5>
						<Dropdown v-model="selectedGroupedCity" :options="groupedCities" optionLabel="label"
							optionGroupLabel="label" optionGroupChildren="items">
							<template #optiongroup="slotProps">
								<div class="flex align-items-center country-item">
									<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="18" />
									<div>{{ slotProps.option.label }}</div>
								</div>
							</template>
						</Dropdown>

						<h5>Advanced with Templating, Filtering and Clear Icon</h5>
						<Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" :filter="true"
							placeholder="Select a Country" :showClear="true">
							<template #value="slotProps">
								<div class="country-item country-item-value" v-if="slotProps.value">
									<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" />
									<div>{{ slotProps.value.name }}</div>
								</div>
								<span v-else>
									{{ slotProps.placeholder }}
								</span>
							</template>
							<template #option="slotProps">
								<div class="country-item">
									<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" />
									<div>{{ slotProps.option.name }}</div>
								</div>
							</template>
						</Dropdown>

						<h5>Loading State</h5>
						<Dropdown placeholder="Loading..." loading></Dropdown>

						<h5>Virtual Scroll (1000 Items)</h5>
						<Dropdown v-model="selectedItem1" :options="items" optionLabel="label" optionValue="value"
							:virtualScrollerOptions="{ itemSize: 38 }" placeholder="Select Item"></Dropdown>

						<h5>Virtual Scroll (1000 Items) and Lazy</h5>
						<Dropdown v-model="selectedItem2" :options="lazyItems" optionLabel="label" optionValue="value"
							:virtualScrollerOptions="{ lazy: true, onLazyLoad: onLazyLoad, itemSize: 38, showLoader: true, loading: loading, delay: 250 }"
							placeholder="Select Item">
							<template v-slot:loader="{ options }">
								<div class="flex align-items-center p-2" style="height: 38px">
									<Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
								</div>
							</template>
						</Dropdown>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const items = ref([
			{
				label: 'Options',
				items: [{
					label: 'Update',
					icon: 'pi pi-refresh',
					command: () => {
						toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
					}
				},
				{
					label: 'Delete',
					icon: 'pi pi-times',
					command: () => {
						toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
					}
				}
				]
			},
			{
				label: 'Navigate',
				items: [{
					label: 'Vue Website',
					icon: 'pi pi-external-link',
					url: 'https://vuejs.org/'
				},
				{
					label: 'Router',
					icon: 'pi pi-upload',
					command: () => {
						window.location.hash = "/fileupload"
					}
				}
				]
			}
		]);


		const selectedCity1 = ref();
		const selectedCity2 = ref();
		const selectedCountry = ref();
		const selectedGroupedCity = ref();
		const selectedItem1 = ref();
		const selectedItem2 = ref();
		const loading = ref(false);
		const cities = ref([
			{ name: 'New York', code: 'NY' },
			{ name: 'Rome', code: 'RM' },
			{ name: 'London', code: 'LDN' },
			{ name: 'Istanbul', code: 'IST' },
			{ name: 'Paris', code: 'PRS' }
		]);
		const countries = ref([
			{ name: 'Australia', code: 'AU' },
			{ name: 'Brazil', code: 'BR' },
			{ name: 'China', code: 'CN' },
			{ name: 'Egypt', code: 'EG' },
			{ name: 'France', code: 'FR' },
			{ name: 'Germany', code: 'DE' },
			{ name: 'India', code: 'IN' },
			{ name: 'Japan', code: 'JP' },
			{ name: 'Spain', code: 'ES' },
			{ name: 'United States', code: 'US' }
		]);
		const groupedCities = ref([
			{
				label: 'Germany', code: 'DE',
				items: [
					{ label: 'Berlin', value: 'Berlin' },
					{ label: 'Frankfurt', value: 'Frankfurt' },
					{ label: 'Hamburg', value: 'Hamburg' },
					{ label: 'Munich', value: 'Munich' }
				]
			},
			{
				label: 'USA', code: 'US',
				items: [
					{ label: 'Chicago', value: 'Chicago' },
					{ label: 'Los Angeles', value: 'Los Angeles' },
					{ label: 'New York', value: 'New York' },
					{ label: 'San Francisco', value: 'San Francisco' }
				]
			},
			{
				label: 'Japan', code: 'JP',
				items: [
					{ label: 'Kyoto', value: 'Kyoto' },
					{ label: 'Osaka', value: 'Osaka' },
					{ label: 'Tokyo', value: 'Tokyo' },
					{ label: 'Yokohama', value: 'Yokohama' }
				]
			}
		]);

		const lazyItems = ref(Array.from({ length: 100000 }));

		return { selectedCity1, selectedCity2, selectedCountry, selectedGroupedCity, cities, countries, groupedCities, selectedItem1, selectedItem2, loading, items, lazyItems }
	},
	loadLazyTimeout: null,
	methods: {
		onLazyLoad(event) {
			this.loading = true;

			if (this.loadLazyTimeout) {
				clearTimeout(this.loadLazyTimeout);
			}

			//imitate delay of a backend call
			this.loadLazyTimeout = setTimeout(() => {
				const { first, last } = event;
				const lazyItems = [...this.lazyItems];

				for (let i = first; i < last; i++) {
					lazyItems[i] = { label: `Item #${i}`, value: i };
				}

				this.lazyItems = lazyItems;
				this.loading = false;
			}, Math.random() * 1000 + 250);
		}
	}
}
</script>
